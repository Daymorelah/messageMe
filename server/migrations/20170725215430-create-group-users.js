
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GroupUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        reference: [{
          model: 'User',
          as: 'usersOfThisGroup',
          key: 'id'
        }]
      },
      groupid: {
        type: Sequelize.INTEGER,
        reference: [{
          model: 'Group',
          key: 'id',
          as: 'groupsForThisUSer'
        }]
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GroupUsers');
  }
};