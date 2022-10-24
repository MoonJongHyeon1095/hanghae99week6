const UserService = require("../services/users.service");
const LikesService = require('../services/likes.service');
const ParticipatesService = require('../services/participates.service');
const joi = require("../util/joi");
const bcrypt = require("bcrypt");
const { InvalidParamsError, ValidationError } = require("../exceptions/index.exception");
require("dotenv").config();

class UsersController {
  userService = new UserService();
  participatesService = new ParticipatesService();
  likesService = new LikesService();

  /**
   * 회원가입 컨트롤러
   * 클라이언트로 부터 받은 유저정보를 검증하고 암호화 합니다.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
 
  signup = async (req, res, next) => {
    try {
      /**
       * @email
       */
      const { email, nickname, password, confirm } =
        await joi.signupSchema.validateAsync(req.body);

      if (!email || !nickname || !password || !confirm) {
        throw new InvalidParamsError("뭐 하나 빼먹으셨는데?");
      }

      if (password !== confirm)
        throw new ValidationError("비번이 확인란이랑 다른 걸요.");

      if (password.includes(nickname) || nickname.includes(password))
        throw new ValidationError("닉네임이랑 비번이 그게 뭐에요.");

      // 비밀번호 hash
      const hashed = await bcrypt.hash(password, 12);

      const users = await Object.create({ email: email, nickname : nickname, password: hashed });
      
      // hash된 유저 정보를 service로 전달
      // 서비스 계층에 구현된 createUser 로직을 실행합니다.
      await this.userService.createUser(users);

      res
        .status(201)
        .json({ message: "회원으로 가입되었다." });
    } catch (error) {
      next(error);
    }
  };

  /**
   * 로그인 컨트롤러
   * 클라이언트로부터 받은 정보를 1차적으로 검증하고 service로 전달합니다.
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = await joi.loginSchema.validateAsync(
        req.body
      );
      console.log(email,password)
      if (!email || !password) {
        throw new InvalidParamsError("뭐 하나 빼먹으셨는데?");
      }

      const { accessToken, refreshToken } = await this.userService.findUser(req, res);
      return res.status(200).json({ accessToken,refreshToken, message: "로그인이 되었다." });
    } catch (error) {
      next(error);
    }
  };

  
  /**
   * 마이페이지 컨트롤러
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  mypage = async(req, res, next) => {
    try{
      const { userId } = res.locals.user

      const likes = await this.likesService.findAllLike({ userId })
      const participates = await this.participatesService.findAllParty({ userId })

      res.status(200).json({ likes, participates })
      
    }catch(error) {
      next(error);
    }
  }
}

module.exports = UsersController;
