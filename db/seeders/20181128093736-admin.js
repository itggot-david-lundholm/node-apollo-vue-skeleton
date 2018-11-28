'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
      */
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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
      */
     return queryInterface.bulkDelete('users', null, {});
  }
};
