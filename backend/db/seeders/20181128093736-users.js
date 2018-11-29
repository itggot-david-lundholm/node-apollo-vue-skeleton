'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     const date = new Date()

      return queryInterface.bulkInsert('users', [
        {
          username: 'admin',
          email: 'admin@example.com',
          password: 'password',
          role: 'ADMIN',
          createdAt: date,
          updatedAt: date
        },
        ...[...Array(5).keys()].map( i => 
          ({
            username: `user${i}`,
            email: `user${i}@example.com`,
            password: 'password',
            role: 'USER',
            createdAt: date,
            updatedAt: date
          })
        )
      ], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('users', null, {});
  }
};
