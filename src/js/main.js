import '../css/variables.css';
import '../css/reset.css';
import '../css/global.css';
import '../css/components.css';
import '../css/sections.css';
import '../css/responsive.css';
import '../css/animations.css';

import { renderHeader } from '../components/header.js';
import { renderFooter } from '../components/footer.js';
import { initNavigation } from './navigation.js';
import { Router } from './router.js';

// Page imports
import { renderHomePage } from '../pages/home.js';
import { renderCharterPage } from '../pages/charter.js';
import { renderRequestCharterPage, afterRenderRequestCharterPage } from '../pages/requestCharter.js';
import { renderFleetPage, afterRenderFleetPage } from '../pages/fleet.js';
import { renderAircraftSalesPage } from '../pages/aircraftSales.js';
import { renderAircraftSalesDetailPage, afterRenderAircraftSalesDetailPage } from '../pages/aircraftSalesDetail.js';
import { renderAircraftManagementPage } from '../pages/aircraftManagement.js';
import { renderDesignCompletionPage } from '../pages/designCompletion.js';
import { renderDestinationsPage } from '../pages/destinations.js';
import { renderAboutPage } from '../pages/about.js';
import { renderInsightsPage } from '../pages/insights.js';
import { renderContactPage, afterRenderContactPage } from '../pages/contact.js';
import { renderTeamPage } from '../pages/team.js';
import { renderCareersPage } from '../pages/careers.js';
import { renderSustainabilityPage } from '../pages/sustainability.js';
import { renderGalleryPage } from '../pages/gallery.js';
import { renderFaqPage } from '../pages/faq.js';
import { renderLegalPage } from '../pages/legal.js';
import { renderLoginPage, afterRenderLoginPage } from '../pages/login.js';
import { renderDashboardPage, afterRenderDashboardPage } from '../pages/dashboard.js';
import { renderAdminPage, afterRenderAdminPage } from '../pages/admin.js';

document.addEventListener('DOMContentLoaded', () => {
  const appHeader = document.getElementById('app-header');
  const appFooter = document.getElementById('app-footer');
  const pageContainer = document.getElementById('page-container');

  if (appHeader) appHeader.innerHTML = renderHeader();
  if (appFooter) appFooter.innerHTML = renderFooter();

  initNavigation();

  const routes = [
    { path: '/', render: renderHomePage },
    { path: '/charter', render: renderCharterPage },
    { path: '/request-charter', render: renderRequestCharterPage, afterRender: afterRenderRequestCharterPage },
    { path: '/aircraft', render: renderFleetPage, afterRender: afterRenderFleetPage },
    { path: '/aircraft-sales', render: renderAircraftSalesPage },
    { path: '/aircraft-sales/:slug', render: renderAircraftSalesDetailPage, afterRender: afterRenderAircraftSalesDetailPage },
    { path: '/aircraft-management', render: renderAircraftManagementPage },
    { path: '/design-completion', render: renderDesignCompletionPage },
    { path: '/destinations', render: renderDestinationsPage },
    { path: '/about', render: renderAboutPage },
    { path: '/insights', render: renderInsightsPage },
    { path: '/contact', render: renderContactPage, afterRender: afterRenderContactPage },
    { path: '/team', render: renderTeamPage },
    { path: '/careers', render: renderCareersPage },
    { path: '/sustainability', render: renderSustainabilityPage },
    { path: '/gallery', render: renderGalleryPage },
    { path: '/faq', render: renderFaqPage },
    { path: '/privacy-policy', render: () => renderLegalPage('privacy-policy') },
    { path: '/cookie-policy', render: () => renderLegalPage('cookie-policy') },
    { path: '/terms', render: () => renderLegalPage('terms') },
    { path: '/disclaimer', render: () => renderLegalPage('disclaimer') },
    { path: '/accessibility', render: () => renderLegalPage('accessibility') },
    { path: '/login', render: renderLoginPage, afterRender: afterRenderLoginPage },
    { path: '/dashboard', render: renderDashboardPage, afterRender: afterRenderDashboardPage },
    { path: '/admin', render: renderAdminPage, afterRender: afterRenderAdminPage }
  ];

  new Router(routes, pageContainer);
});
