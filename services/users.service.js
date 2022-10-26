const {
  DuplicateDBDataError,
  ValidationError,
} = require("../exceptions/index.exception");
const UserRepository = require("../repositories/users.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  userRepository = new UserRepository();

  /**회원가입 유저 생성
   * 
   * @param {Object} users 유저정보
   * @returns 
   */
  createUser = async (users) => {
    const { email, nickname, password } = users;

    //회원가입으로 받은 이메일이 유저DB에 이미 존재하면 에러방생
    const isExistUser = await this.userRepository.findByEmail( email );
    if (isExistUser) {
      throw new DuplicateDBDataError(
        "동일한 email을 가진 User가 이미 존재합니다."
      );
    }

    //유저생성 레퍼지토리 호출
    await this.userRepository.createUser({
      email,
      nickname,
      password,
    });
    return;
  };

  /**
   * 로그인 요청 검증하고 토큰발행
   * @param {*} req 
   * @param {*} res 
   * @returns 생성된 토큰
   */
  findUser = async (req, res) => {
    const { email, password } = req.body;
    
    //로그인 하려는 유저 회원검증
    const user = await this.userRepository.findByEmail( email );
    if (!user) throw new ValidationError("그런 사람 없어요. 회원가입 했어요?");

    //유저정보가 있을시 userId선언(편의상선언)
    let userId;
    if(user){ userId = user.userId;}
    
    // 패스워드 검증
    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) throw new ValidationError("비번이 틀렸어요.");
    
    // const expires = new Date();
    // expires.setMinutes(expires.getMinutes() + 60); //쿠키 만료시간 60분

    /**accessToken 발급 */
    const accessToken = jwt.sign(
      { userId: userId },
      process.env.SECRET_KEY,
      { expiresIn: '10s' }
    );

    /**refreshToken 발급 */
    const refreshToken = jwt.sign(
      { userId: userId },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    /**refreshToken 유저정보에 저장(업데이트) */
    await this.userRepository.updateToken(refreshToken,userId);

    /**쿠키에 Token전송 */
    res.cookie('refreshToken', refreshToken);
    res.cookie('accessToken', accessToken);


    return { accessToken, refreshToken };
  };
}

module.exports = UserService;
