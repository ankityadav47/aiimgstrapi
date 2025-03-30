'use strict';

/**
 * user-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::user-image.user-image');
