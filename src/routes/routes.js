//deprecated file, see src/components/app.js
import { Router } from '@vaadin/router';
import '../components/employee-list/employee-list.js';

export const routes = [
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: 'employee-list' },
  {
    path: '/add',
    action: async () => {
      await import('../components/employee-form/employee-form.js');
      return { component: 'employee-form' };
    }
  },
  {
    path: '/edit/:id',
    action: async () => {
      await import('../components/employee-form/employee-form.js');
      return { component: 'employee-form' };
    }
  },
  { path: '(.*)', redirect: '/' },
];

export function setupRouter(outlet) {
  const router = new Router(outlet);
  router.setRoutes(routes);
  return router;
}
