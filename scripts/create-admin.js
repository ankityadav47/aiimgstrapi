'use strict';

// Script to force create an admin user

module.exports = async ({ strapi }) => {
  const params = {
    username: 'admin',
    email: 'ankityadav913156@gmail.com',
    password: 'Admin@123456',
    firstname: 'Admin',
    lastname: 'User',
    blocked: false,
    isActive: true,
  };

  try {
    // First try to find if user exists
    const existingUser = await strapi.db.query('admin::user').findOne({
      where: { email: params.email }
    });

    if (existingUser) {
      // If user exists, update their password directly in the database
      console.log('Admin user exists, updating password...');
      
      const hashedPassword = await strapi.admin.services.auth.hashPassword(params.password);
      
      await strapi.db.query('admin::user').update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          isActive: true,
          blocked: false
        }
      });
      
      console.log('Admin password updated!');
    } else {
      // Create new admin if doesn't exist
      console.log('Creating new admin user...');
      
      // Get super admin role
      const superAdminRole = await strapi.db.query('admin::role').findOne({
        where: { code: 'strapi-super-admin' }
      });
      
      if (!superAdminRole) {
        console.error('Could not find super admin role!');
        return;
      }
      
      // Create the admin
      await strapi.admin.services.user.create({
        ...params,
        registrationToken: null,
        isActive: true,
        roles: [superAdminRole.id]
      });
      
      console.log('Admin user created successfully!');
    }
  } catch (error) {
    console.error('Error managing admin user:', error);
  }
}; 