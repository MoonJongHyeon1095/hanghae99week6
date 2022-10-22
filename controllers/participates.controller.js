const ParticipatesService = require('../services/participates.service');
const { InvalidParamsError } = require("../exceptions/index.exception");

class ParticipatesController {
    participatesService = new ParticipatesService();

    //참여하기 및 참여취소
    put = async(req, res, next) =>{
        try{
        const { userId } = res.locals.user;
        const { meetingId } = req.params;
        console.log(`userId:${userId}`);
        console.log(`meetingId:${meetingId}`);

        //유저정보 또는 미팅정보가 없으면 에러방생
        if (!userId || !meetingId) {
            throw new InvalidParamsError();
          }

          const findOneparty = await this.participatesService.findOneParty({userId, meetingId})
          console.log(`findeOneparty:${findOneparty}`)

          
          if(!findOneparty){
            await this.participatesService.createParty({userId, meetingId}) //참여가 되어있지 않으면 참여하기
            res.status(201).send({msg:"참여하기 완료!"});
          }else{await this.participatesService.cancelParty({userId, meetingId})} //참여가 되어있으면 참여 취소하기

        } catch (error) {
            next(error);
        }
    }
}



module.exports = ParticipatesController;