
const CommentsController = require('../../../controllers/comments.controller');
const { 
    commentOutput,
    commentInput,
    requestParams,
    responseLocalsUser
     } = require('../../fixtures/comment.fixtures');


const mockCommentModel = () => ({
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    destroy: jest.fn(),
  });

  let mockCommentRequest={
    body:jest.fn(),
    params:jest.fn()
  }

  let mockCommentResponse={
    status:jest.fn(),
    json:jest.fn(),
    locals:jest.fn()
  }

  let mockCommentNext = {
    next:jest.fn()
  }

describe('comment Test',()=>{
let commentsController= new CommentsController()
commentsController.CommentsService = mockCommentModel()

beforeEach(()=>{
    jest.resetAllMocks()
})


//코멘트 조회 테스트
test('commentsController Method getComment',async()=>{
    mockCommentRequest.params = requestParams
    
    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })

    
    const arr1= []
    commentsController.CommentsService.getComment = jest.fn(()=>{
        return arr1
    })
    await commentsController.getComment(mockCommentRequest,mockCommentResponse,mockCommentNext)
    
    expect(commentsController.CommentsService.getComment).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.status).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.json).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.status).toHaveBeenCalledWith(201)
    
    expect(mockCommentResponse.json).toHaveBeenCalledWith({result:arr1})
    
    

})

//코멘트 생성 테스트
test('commentService Method createComment',async()=>{
    mockCommentRequest.params = requestParams
    mockCommentResponse.locals.user = responseLocalsUser
    mockCommentResponse.body=commentInput

    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })

    console.log(mockCommentResponse.body,mockCommentRequest.params)
    commentsController.CommentsService.createComment=jest.fn(()=>{
        return commentInput
    })


   await commentsController.createComment(
    mockCommentRequest,mockCommentResponse,mockCommentNext)
    
    expect(commentsController.CommentsService.createComment).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.status).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.json).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.status).toHaveBeenCalledWith(201)
    
    expect(mockCommentResponse.status).toHaveBeenCalledWith(commentInput)
    

})

//코멘트 수정 테스트
test('commentService Method updateComment',async()=>{
    mockCommentRequest.params = requestParams
    mockCommentResponse.locals.user = responseLocalsUser
    mockCommentResponse.body=commentInput

    commentsController.CommentsService.updateComment=jest.fn(()=>{
        return commentInput
    })
    
    await commentsController.updateComment(mockCommentRequest,mockCommentResponse,mockCommentNext)

    expect(commentsController.CommentsService.updateComment).toHaveBeenCalledTimes(1);
    
    expect(comments).toEqual(commentInput)

    expect(commentsController.CommentsService.updateComment).toHaveBeenCalledWith(commentId,userId,comment);

})

//코멘트 삭제 테스트
test('commentService Method deleteComment',async()=>{
    
    commentsController.CommentsService.deleteComment=jest.fn(()=>{
      
      return commentInput
    })
    await commentsController.deleteComment(mockCommentRequest,mockCommentResponse,mockCommentNext)
    
    expect(commentsController.CommentsService.deleteComment).toHaveBeenCalledTimes(1);

    expect(comments).toEqual(commentInput)

    expect(commentsController.CommentsService.deleteComment).toHaveBeenCalledWith(commentId,userId);
})

})