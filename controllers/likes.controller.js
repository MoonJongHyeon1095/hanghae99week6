const LikesService = require('../services/likes.service');

class LikesController {
    likesService = new LikesService();

        //좋아요 및 좋아요취소
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

              const findOneLike = await this.likesService.findOneLike({userId, meetingId})
              console.log(`findeOneLike:${findOneLike}`)
    
              
              if(!findOneLike){
                await this.likesService.createLike({userId, meetingId}) //좋아요 되어있지 않을시 좋아요
                res.status(201).send({msg:"좋아요!"});
              }else{
                await this.likesService.cancelLike({userId, meetingId})//좋아요 되어 있을시 좋아요취소
                res.status(201).send({msg:"좋아요 취소"});
            } 
            
            } catch (error) {
                next(error);
            }
        }

}

module.exports = LikesController;