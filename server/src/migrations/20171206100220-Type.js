export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('type', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Идентификатор записи'
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: 'type_name__unique',
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
        type_name__unique: {
            fields: ['title']
        }
      }
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('type');
  }
};