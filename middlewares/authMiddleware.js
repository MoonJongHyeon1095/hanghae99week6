const jwt = require('jsonwebtoken');
const { Users } = require('../models');
require('dotenv').config();

// 유저 인증에 실패하면 403 상태 코드를 반환한다.
module.exports = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = req.headers.auth;
    // console.log(accessToken)
    // console.log(refreshToken)

    if (!accessToken || !refreshToken) {
      return res.status(403).send({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }

    /**검증결과에 따라 true,false가 담김 (type: blooean)*/
    const isAccessTokenValidate =  validateAccessToken(accessToken);
    const isRefreshTokenValidate =  validateRefreshToken(refreshToken);

    /**AccessToken검증 */
    function validateAccessToken(accessToken) {
      try {
        jwt.verify(accessToken, process.env.SECRET_KEY); 
        return true;
      } catch (error) {
        return false;
      }
    }

    /**RefreshToken검증 */
    function validateRefreshToken(refreshToken) {
      try {
        jwt.verify(refreshToken, process.env.SECRET_KEY); 
        return true;
      } catch (error) {
        return false;
      }
    }

     /**refreshToken만료시 재로그인 요청 */
    if (!isRefreshTokenValidate) return res.status(419).json({ "message": "다시 로그인 해주세요." });

    /**AccessToken만 만료시 AccessToken재발급 */
    if (!isAccessTokenValidate) {

      /**refresh토큰 에서 유저정보 받아오기 */
      console.log(jwt.verify(refreshToken, process.env.SECRET_KEY));
      const { userId } = jwt.verify(refreshToken, process.env.SECRET_KEY);
      console.log(userId);

      /**AccessToken 재발급 */
      const newAccessToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY, { expiresIn: '10s' });

      /**유저정보 DB에서 찾아오기*/
      const user = await Users.findByPk(userId);

      /**새로 발급받은 토큰전송 */
      res.cookie('accessToken', newAccessToken);
      console.log("토큰 재발급");

      /**로그인 유저정보 저장 */
      res.locals.user = user;
    }else{    /**토큰이 모두 유효한 경우 */
    const { userId } = jwt.verify(accessToken, process.env.SECRET_KEY);
    const user = await Users.findByPk(userId);
    res.locals.user = user;
    }

    next();
  } catch (error) {
    console.trace(error);
    return res.status(403).send({
      errorMessage: '로그인이 필요한 기능입니다.',
    });
  }
};