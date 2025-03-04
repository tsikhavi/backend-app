module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Проверяем, существует ли пользователь с id = 1
    const user = await queryInterface.sequelize.query(
      'SELECT * FROM "Users" WHERE id = 1;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (user.length > 0) {
      // Если пользователь существует, обновляем его баланс
      return queryInterface.sequelize.query(
        'UPDATE "Users" SET balance = 10000, "updatedAt" = NOW() WHERE id = 1;'
      );
    }
    // Если пользователя нет, создаём нового с id=1
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        balance: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async queryInterface =>
    queryInterface.sequelize.query(
      'UPDATE "Users" SET balance = 0, "updatedAt" = NOW() WHERE id = 1;'
    ),
};
