export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Идентификатор записи'
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: 'status_name__unique',
        comment: 'Название'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Системное название'
      },
    },
    {
      uniqueKeys: {
        status_name__unique: {
            fields: ['title']
        }
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('status');
  }
};
