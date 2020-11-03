'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      isComplete: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false 
      },
      listId: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      dueDate: {
        allowNull: false,
        type: Sequelize.DATE
      },
      estimate: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Tasks');
  }
};