'use strict';

/**
 * global-image service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::global-image.global-image');
