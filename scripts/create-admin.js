'use strict';

// Script to create an admin user

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

  // Check if any admin user exists
  const admins = await strapi.query('admin::user').findMany();
  
  if (admins.length === 0) {
    try {
      await strapi.admin.services.user.create({
        ...params,
        registrationToken: null,
        isActive: true,
        roles: [1], // Make this user a super admin
      });
      console.log('Admin user created!');
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  } else {
    console.log('Admin user already exists, skipping creation.');
  }
}; 