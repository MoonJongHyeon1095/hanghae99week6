const ParticipatesService = require('../services/participates.service');
const { InvalidParamsError } = require("../exceptions/index.exception");

class ParticipatesController {
    participatesService = new ParticipatesService();

    /**참여상태 변경 컨트롤러*/
    put = async(req, res, next) =>{
        try{
          /**
           * @const userId 참가변경 요청을한 유저ID
           * @const nickname 참가변경 요청을한 유저닉네임
           */
        const { userId, nickname } = res.locals.user;

        /** 참가변경을할 게시글ID*/
        const meetingId = req.params.meetingId;
        console.log(`userId:${userId}`);
        console.log(`meetingId:${meetingId}`);

    /**받아온 유저정보 또는 미팅정보가 없으면 에러방생 */
        if (!userId || !meetingId) {
            throw new InvalidParamsError();
          }

          /**유저가 게시글에 참가한 정보 가져오기*/
          const findOneparty = await this.participatesService.findOneParty({userId, meetingId})
          console.log(`findeOneparty:${findOneparty}`)

          /**참가 정보 유무에 따라 참여변경 */
          if(!findOneparty){
            await this.participatesService.joinParty({userId, meetingId, nickname}) //참여가 되어있지 않으면 참여하기
            res.status(201).send({msg:"참여하기 완료!"});
          }else{
            await this.participatesService.cancelParty({userId, meetingId})//참여가 되어있으면 참여 취소하기
            res.status(201).send({msg:"참여취소"});
          } 

        } catch (error) {
            next(error);
        }
    }
}



module.exports = ParticipatesController;