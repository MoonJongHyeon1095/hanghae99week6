const {
  DuplicateDBDataError,
  ValidationError,
} = require("../exceptions/index.exception");
const UserRepository = require("../repositories/Users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  createUser = async (users) => {
    const { email, nickname, password } = users;
    const isExistUser = await this.userRepository.findByEmail({ email });
    if (isExistUser) {
      throw new DuplicateDBDataError(
        "동일한 email을 가진 User가 이미 존재합니다."
      );
    }

    await this.userRepository.createUser({
      email,
      nickname,
      password,
    });

    return;
  };

  findUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await this.userRepository.findByEmail({ email });
    if (!user) throw new ValidationError("그런 사람 없어요. 회원가입 했어요?");

    // 패스워드 검증
    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) throw new ValidationError("비번이 틀렸어요.");

    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 60); //쿠키 만료시간 60분

    const token = jwt.sign(
      { userId: user.userId },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 24 }
      // 일단 24시간짜리로 실험.
    );

    res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, {
      expires: expires,
    });

    return token;
  };
}

module.exports = UserService;
