export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('user_file', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Идентификатор записи'
      },
      user_file_id: {
        type: Sequelize.INTEGER,
        user_file_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
          comment: 'Идентификатор статуса'
        },
        comment: 'Название'
      },
      file_id: {
        type: Sequelize.INTEGER,
        file_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'File',
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade',
          comment: 'Идентификатор статуса'
        },
        comment: 'Системное название'
      },
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user_file');
  }
};
