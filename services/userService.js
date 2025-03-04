const User = require("../models/User");

async function updateBalance(userId, amount) {
  const t = await User.sequelize.transaction(); // Открываем транзакцию вручную
  try {
    const user = await User.findByPk(userId, {
      lock: t.LOCK.UPDATE,
      transaction: t
    });

    if (!user) throw new Error("User not found");
    if (user.balance + amount < 0) throw new Error("Insufficient funds");

    user.balance += amount;
    await user.save({ transaction: t });

    await t.commit();

    return { userId: user.id, newBalance: user.balance };
  } catch (error) {
    await t.rollback();
    throw error;
  }
}

module.exports = { updateBalance };
