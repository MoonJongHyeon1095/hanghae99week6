const { Users } = require("../models");
const { Op } = require("sequelize");

class UserRepository {
  createUser = async ( {email, nickname, password }) => {
    const createUserData = await Users.create({
      email,
      nickname,
      password,
  });

    return createUserData;
  };

  findUser = async ( email, password ) => {
    const user = await Users.findOne({
      where: {
        [Op.and]: [{ email }, { password }],
      },
    });

    return user;
  };

  findByEmail = async ({ email }) => {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    return user;
  };
}

module.exports = UserRepository;
