module.exports = ({ env }) => ({
  url: env('RENDER_EXTERNAL_URL'),
  app: {
    keys: env.array('APP_KEYS')
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
}); 