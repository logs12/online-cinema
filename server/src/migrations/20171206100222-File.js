export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('file', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Идентификатор записи'
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Название'
      },
      filename: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: 'Оригинальное название файла'
      },
      url: {
        type: Sequelize.STRING,
        comment: 'Ссылка на файл если он загружается с внешнего источника'
      },
      extension: {
        type: Sequelize.STRING(10),
        allowNull: false,
        comment: 'extension'
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'status',    
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        comment: 'Идентификатор статуса'
      },
      created_at: {
        type: Sequelize.DATE,
        comment: 'Дата добавления записи'
      },
      updated_at: {
        type: Sequelize.DATE,
        comment: 'Дата изменения записи'
      },
      deleted_at: {
        type: Sequelize.DATE,
        comment: 'Дата удаления записи'
      },
      created_by: {
        type: Sequelize.INTEGER,
        comment: 'Идентификатор пользователя создавшего запись'
      },
      updated_by: {
        type: Sequelize.INTEGER,
        comment: 'Идентификатор пользователя редактировавшего запись'
      },
    })
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('file');
  }
};
