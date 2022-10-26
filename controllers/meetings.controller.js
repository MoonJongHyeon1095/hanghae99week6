const MeetingsService = require('../services/meetings.service');

class MeetingsController {
    meetingsService = new MeetingsService();
    
    findAllMeeting = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const findallmeeting = await this.meetingsService.findAllMeeting(userId);
            res.status(200).json({data:findallmeeting});
        }catch(err){
            next(err)       
        }
    }
    findOneMeeting = async(req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {meetingId} = req.params;
            const findonemeeting = await this.meetingsService.findOneMeeting(userId, meetingId);
            res.status(200).json({data:findonemeeting})
        }catch(err){
            next(err) 
        }
    }
    createMeeting = async (req,res,next)=>{
        try{
            const {userId,nickname} = res.locals.user;
            const {title, content} = req.body;
            const createmeeting = await this.meetingsService.createMeeting(userId,nickname,title,content);
            res.status(200).json({data:createmeeting})
        }catch(err){
            next(err)
        }
    }
    updateMeeting = async (req,res,next)=>{
        try{
            const{userId}= res.locals.user;
            const{meetingId}= req.params;
            const{title,content} = req.body;
            const updatemeeting = await this.meetingsService.updateMeeting(meetingId,userId,title,content);
            res.status(200).json({data:updatemeeting})
        }catch(err){
            next(err)  
        }
    }
    deleteMeeting = async (req,res,next)=>{
        try{
            const {userId} = res.locals.user;
            const {meetingId} = req.params;
            const deletemeeting = await this.meetingsService.deleteMeeting(meetingId,userId);
            res.status(200).json({data:deletemeeting})
        }catch(err){
            next(err) 
        }
    }
}
module.exports = MeetingsController;