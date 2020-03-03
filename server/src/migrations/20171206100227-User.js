export default {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Идентификатор записи'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Имя'
      },
      second_name: {
        type: Sequelize.STRING,
        comment: 'Фамилия'
      },
      third_name: {
        type: Sequelize.STRING,
        comment: 'Отчество'
      },
      email: {
        type: Sequelize.STRING,
        comment: 'Электропочта'
      },
      phone: {
        type: Sequelize.STRING,
        comment: 'Телефон'
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Хэш пароля'
      },
      auth_key: {
        type: Sequelize.STRING,
        comment: 'Ключ подтверждения для cookie аутентификации'
      },
      type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "type",
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        comment: 'Тип пользователя'
      },
      file_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "file",
          },
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
        comment: 'Идентификатор файла фотографии'
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "status",
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
    })

  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('user');
  }
};
