

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messageOwner: {
        type: Sequelize.STRING
      },
      messageBody: {
        type: Sequelize.TEXT
      },
      groupId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'Groups',
          key: 'id',
          as: 'groupMessages'
        }
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
    return queryInterface.dropTable('Messages');
  }
};