
const CommentService = require('../../../services/comments.service');
const { 
    commentOutput,
    commentInput,
     } = require('../../fixtures/comment.fixtures');


const mockNaverUsersModel = () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  });

describe('comment Test',()=>{
let commentService= new CommentService()
commentService.CommentRepository = Object.assign({},mockNaverUsersModel());

beforeEach(()=>{
    jest.resetAllMocks()
})


//코멘트 조회 테스트
test('commentService Method getComment',async()=>{
    
    commentService.CommentRepository.getComment=jest.fn(()=>{
        return commentOutput
    })
    const {meetingId} = commentInput
    const comments = await commentService.getComment(meetingId)
    
    expect(commentService.CommentRepository.getComment).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentOutput)

})

//코멘트 생성 테스트
test('commentService Method createComment',async()=>{
    
    commentService.CommentRepository.createComment=jest.fn(()=>{
        return commentInput
    })
    const {meetingId,userId,comment} = commentInput
    const comments = await commentService.createComment(meetingId,userId,comment)
    
    expect(commentService.CommentRepository.createComment).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

})

//코멘트 수정 테스트
test('commentService Method updateComment',async()=>{
    
    commentService.CommentRepository.updateComment=jest.fn(()=>{
        return commentInput
    })
    const {commentId,userId,comment} = commentInput
    const comments = await commentService.updateComment(commentId,userId,comment)

    expect(commentService.CommentRepository.updateComment).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

    expect(commentService.CommentRepository.updateComment).toHaveBeenCalledWith(commentId,userId,comment);

})

//코멘트 삭제 테스트
test('commentService Method deleteComment',async()=>{
    
    commentService.CommentRepository.deleteComment=jest.fn(()=>{
        return commentInput
    })
    const {commentId,userId} = commentInput
    const comments = await commentService.deleteComment(commentId,userId)
    
    expect(commentService.CommentRepository.deleteComment).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

    expect(commentService.CommentRepository.deleteComment).toHaveBeenCalledWith(commentId,userId);
})

})