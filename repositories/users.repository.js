const { User } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  createUser = async ({ email, nickname, hashed }) => {
    const createUserData = await User.create({
      email,
      nickname,
      hashed,
    });

    return createUserData;
  };

  findUser = async ({ email, password }) => {
    const user = await User.findOne({
      where: {
        [Op.and]: [{ email }, { password }],
      },
    });

    return user;
  };

  findByEmail = async ({ email }) => {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    return user;
  };
}

module.exports = UserRepository;
