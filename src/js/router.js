import { updateActiveNavLinks } from './navigation.js';

export class Router {
  constructor(routes, appContainer) {
    this.routes = routes; // Array of { path, render }
    this.appContainer = appContainer;
    this.init();
  }

  init() {
    // Intercept clicks on links with data-link attribute
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigateTo(url);
      }
    });

    // Handle back/forward navigation
    window.addEventListener('popstate', () => {
      this.route();
    });

    // Initial load
    this.route();
  }

  navigateTo(url) {
    window.history.pushState(null, null, url);
    this.route();
  }

  route() {
    const path = window.location.pathname;

    let matchedRoute = null;
    let params = {};

    for (const route of this.routes) {
      const paramNames = [];
      const regexPath = route.path.replace(/:([^\s/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return '([^/]+)';
      });

      const regex = new RegExp(`^${regexPath}$`);
      const match = path.match(regex);

      if (match) {
        matchedRoute = route;
        paramNames.forEach((name, index) => {
          params[name] = match[index + 1];
        });
        break;
      }
    }

    // Default to Home if no match
    if (!matchedRoute) {
      matchedRoute = this.routes.find(r => r.path === '/') || this.routes[0];
    }

    // Render page
    this.appContainer.innerHTML = matchedRoute.render(params);

    // Run post-render lifecycle hook if defined
    if (typeof matchedRoute.afterRender === 'function') {
      matchedRoute.afterRender(params);
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Update active nav links
    updateActiveNavLinks();
  }
}
