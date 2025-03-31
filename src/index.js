'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    // Add health check endpoint
    strapi.server.routes({
      method: 'GET',
      path: '/_health',
      handler: (ctx) => {
        ctx.body = 'ok';
      },
      config: {
        auth: false,
      }
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // Load and run the admin creation script on bootstrap
    const createAdmin = require('../scripts/create-admin');
    return createAdmin({ strapi });
  },
};
