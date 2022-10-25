
const CommentRepository = require('../../../repositories/comments.repository');
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
let commentRepository= new CommentRepository()
commentRepository.Comments = mockNaverUsersModel();

beforeEach(()=>{
    jest.resetAllMocks()
})


//코멘트 조회 테스트
test('commentRepository Method getComment',async()=>{
    
    commentRepository.Comments.findAll=jest.fn(()=>{
        return commentOutput
    })
    const meetingId = 1
    const comments = await commentRepository.getComment(meetingId)
    
    expect(commentRepository.Comments.findAll).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentOutput)

})

//코멘트 생성 테스트
test('commentRepository Method createComment',async()=>{
    
    commentRepository.Comments.create=jest.fn(()=>{
        return commentInput
    })
    const {meetingId,userId,comment} = commentInput
    const comments = await commentRepository.createComment(meetingId,userId,comment)
    
    expect(commentRepository.Comments.create).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

})

//코멘트 수정 테스트
test('commentRepository Method updateComment',async()=>{
    
    commentRepository.Comments.update=jest.fn(()=>{
        return commentInput
    })
    const {commentId,userId,comment} = commentInput
    const comments = await commentRepository.updateComment(commentId,userId,comment)

    expect(commentRepository.Comments.update).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

    expect(commentRepository.Comments.update).toHaveBeenCalledWith(
        {comment},
        {where:
            {commentId,userId}
            });

})

//코멘트 삭제 테스트
test('commentRepository Method deleteComment',async()=>{
    
    commentRepository.Comments.update=jest.fn(()=>{
        return commentInput
    })
    const {commentId} = commentInput
    const comments = await commentRepository.deleteComment(commentId)
    
    expect(commentRepository.Comments.destroy).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(undefined)

    expect(commentRepository.Comments.destroy).toHaveBeenCalledWith({where:{commentId}});
})

})