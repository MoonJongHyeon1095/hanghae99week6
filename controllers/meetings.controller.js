const MeetingsService = require('../services/meetings.service');

class MeetingsController {
    meetingsService = new MeetingsService();
    
    findAllMeeting = async(req,res)=>{
        try{
            const findallmeeting = await this.meetingsService.findAllMeeting();
            res.status(200).json({data:findallmeeting});
        }catch(err){
            res.status(400).json({msg : "error"})            
        }
    }
    findOneMeeting = async(req,res)=>{
        try{
            const {meetingId} = req.params;
            const findonemeeting = await this.meetingsService.findOneMeeting(meetingId);
            res.status(200).json({data:findonemeeting})
        }catch(err){
            res.status(400).json({msg : "error"})  
        }
    }
    createMeeting = async (req,res)=>{
        try{
            const {userId,nickname} = res.locals.user;
            const {title, content} = req.body;
            const createmeeting = await this.meetingsService.createMeeting(userId,title,content,nickname);
            res.status(200).json({data:createmeeting})
        }catch(err){
            res.status(400).json({msg : "error"})  
        }
    }
    updateMeeting = async (req,res)=>{
        // try{
            const{userId}= res.locals.user;
            const{meetingId}= req.params;
            const{title,content} = req.body;
            const updatemeeting = await this.meetingsService.updateMeeting(meetingId,userId,title,content);
            res.status(200).json({data:updatemeeting})
        // }catch(err){
        //     res.status(400).json({msg : "error"})  
        // }
    }
    deleteMeeting = async (req,res)=>{
        // try{
            const {userId} = res.locals.user;
            const {meetingId} = req.params;
            const deletemeeting = await this.meetingsService.deleteMeeting(meetingId,userId);
            res.status(200).json({data:deletemeeting})
        // }catch(err){
        //     res.status(400).json({msg : "error"})  
        // }
    }
}
module.exports = MeetingsController;