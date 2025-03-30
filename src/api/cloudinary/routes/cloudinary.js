module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/cloudinary/upload',
      handler: 'cloudinary.upload',
      config: {
        auth: false
      }
    }
  ]
};