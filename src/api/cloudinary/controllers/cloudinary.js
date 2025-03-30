const axios = require('axios');
const FormData = require('form-data');

module.exports = {
  async upload(ctx) {
    try {
      const { imageUrl, cloudName, apiKey, apiSecret, folder } = ctx.request.body;
      
      if (!imageUrl || !cloudName || !apiKey || !apiSecret) {
        return ctx.badRequest('Missing required parameters');
      }
      
      // Download the image
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(imageResponse.data, 'binary');
      
      // Prepare form data for Cloudinary
      const formData = new FormData();
      formData.append('file', buffer, { filename: 'image.png' });
      formData.append('api_key', apiKey);
      formData.append('timestamp', Math.round(new Date().getTime() / 1000));
      if (folder) formData.append('folder', folder);
      
      // Generate the signature
      const sha1 = require('crypto').createHash('sha1');
      const params = {};
      formData.forEach((value, key) => { params[key] = value });
      const signature = sha1.update(
        Object.entries(params)
          .filter(([key]) => key !== 'file' && key !== 'api_key')
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([key, value]) => `${key}=${value}`)
          .join('&') + apiSecret
        ).digest('hex');
        formData.append('signature', signature);
        
        // Upload to Cloudinary
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          { headers: formData.getHeaders() }
        );
        
        return uploadResponse.data;
      } catch (err) {
        console.error('Cloudinary upload error:', err);
        return ctx.badRequest('Error uploading to Cloudinary: ' + err.message);
      }
    }
  };