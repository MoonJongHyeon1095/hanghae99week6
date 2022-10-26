const CommentsController = require('../../../controllers/comments.controller');
const { 
    commentOutput,
    commentInput,
    requestParams,
    responseLocalsUser
     } = require('../../fixtures/comment.fixtures');
const {InvalidParamsError}= require('../../../exceptions/index.exception')


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
    locals:jest.fn(),
    send:jest.fn()
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
    await commentsController.getComment(mockCommentRequest,mockCommentResponse)
    
    expect(commentsController.CommentsService.getComment).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.json).toHaveBeenCalledTimes(1);
    
    expect(mockCommentResponse.json).toHaveBeenCalledWith({result:arr1})
    
    

})

//코멘트 생성 테스트
test('commentsController Method createComment',async()=>{
    mockCommentRequest.params = requestParams
    mockCommentResponse.locals.user = responseLocalsUser
    mockCommentRequest.body=commentInput

    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })

    commentsController.CommentsService.createComment=jest.fn(()=>{
        return commentInput
    })


   await commentsController.createComment(mockCommentRequest,mockCommentResponse)
    
    expect(commentsController.CommentsService.createComment).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.status).toHaveBeenCalledTimes(0);

    expect(mockCommentResponse.json).toHaveBeenCalledTimes(0);

})


//코멘트 수정 테스트
test('commentsController Method updateComment',async()=>{
    mockCommentRequest.params = requestParams
    mockCommentResponse.locals.user = responseLocalsUser
    mockCommentResponse.body=commentInput

    commentsController.CommentsService.updateComment=jest.fn(()=>{
        return commentInput
    })
    
    await commentsController.updateComment(mockCommentRequest,mockCommentResponse)

    expect(commentsController.CommentsService.updateComment).toHaveBeenCalledTimes(1);
    
    expect(mockCommentResponse.send).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.send).toHaveBeenCalledWith("수정이 완료되었습니다.");

})

//코멘트 삭제 테스트
test('commentsController Method deleteComment',async()=>{
    mockCommentRequest.params = requestParams
    mockCommentResponse.locals.user = responseLocalsUser

    commentsController.CommentsService.deleteComment=jest.fn(()=>{
      
      return commentInput
    })
    await commentsController.deleteComment(mockCommentRequest,mockCommentResponse)
    
    expect(commentsController.CommentsService.deleteComment).toHaveBeenCalledTimes(1);

    expect(mockCommentResponse.send).toHaveBeenCalledTimes(1)
    
    expect(mockCommentResponse.send).toHaveBeenCalledWith("삭제가 완료되었습니다.");
})


//코멘트 조회 실패 테스트
test('commentsController Method getComment fail case',async()=>{
    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })
    mockCommentRequest=jest.fn(()=>{
        return null
    })
    commentsController.CommentsService.getComment=jest.fn(()=>{
        return null;
    })
    try{
        await commentsController.getComment(mockCommentRequest,mockCommentResponse)
    }catch(error){
    expect(error.message).toEqual('게시글이 존재하지 않는데요.')

    expect(error).toBeInstanceOf(InvalidParamsError)
    }
})


//코멘트 생성 실패 테스트
test('commentsController Method createComment fail case',async()=>{
    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })
    mockCommentRequest.params=jest.fn(()=>{
        return null
    })
    commentsController.CommentsService.createComment=jest.fn(()=>{
        return null;
    })
    try{
        await commentsController.createComment(mockCommentRequest,mockCommentResponse)
    }catch(error){    
    expect(error.message).toEqual('게시글이 존재하지 않는데요.')

    expect(error).toBeInstanceOf(InvalidParamsError)
    }
})


//코멘트 수정 실패 테스트
test('commentsController Method updateComment fail case',async()=>{    
    mockCommentResponse.status=jest.fn(()=>{
        return mockCommentResponse
    })
    mockCommentRequest.params=jest.fn(()=>{
        return null
    })
    commentsController.CommentsService.updateComment=jest.fn(()=>{
        return null;
    })
    try{
        await commentsController.updateComment(mockCommentRequest,mockCommentResponse)
    }catch(error){       
        expect(error.message).toEqual('게시글이 존재하지 않는데요.')

        expect(error).toBeInstanceOf(InvalidParamsError)
    }
})


//코멘트 삭제 실패 테스트
test('commentsController Method deleteComment fail case',async()=>{
    mockCommentRequest.params=jest.fn(()=>{
        return null
    })

    commentsController.CommentsService.deleteComment=jest.fn(()=>{
        throw new Error()
    })
    try{
        await commentsController.deleteComment(mockCommentRequest,mockCommentResponse)
    }catch(error){
        expect(mockCommentResponse.status).toHaveBeenCalledTimes(1)
        expect(mockCommentResponse.json).toHaveBeenCalledTimes(1)
        expect(mockCommentResponse.status).toHaveBeenCalledWith(400)
        expect(mockCommentResponse.json).toHaveBeenCalledWith(400)
    }
})

})