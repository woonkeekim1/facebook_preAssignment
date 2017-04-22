import { HTTP } from 'meteor/http'
import Post from '../../collection/post'
import * as FBConstant from './facebook-constant'

const getAvailablePageList = () => {
  const token = Meteor.user().services.facebook.accessToken
  const options = {
    params : {
      access_token: token,
    },
  }
  return new Promise((resolve, reject) => {
    HTTP.get('https://graph.facebook.com/me/accounts',
             options,
             (err, result) => {
                                if(err)
                                  reject(err);
                                resolve(result);})
  })
}

const postToPage = ({pageId, message, published = true, pageAccessToken}) => {
  if(pageId && Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      data: {
        access_token: (published) ? token : pageAccessToken,
        message,
        published,
      },
    }
    return new Promise((resolve, reject) => {
      HTTP.call('POST', 'https://graph.facebook.com/' + pageId + '/feed',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })

  }
}

const getPageInfo = ({pageId}) => {
  if(pageId && Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.get('https://graph.facebook.com/' + pageId,
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const getPostsFromPage = ({pageId, isPublish = true}) => {
  if(pageId && Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }
    const path = (isPublish) ? '/feed' : '/promotable_posts'
    return new Promise((resolve, reject) => {
      HTTP.get('https://graph.facebook.com/' + pageId + path + '?fields=id, created_time, message, from{id, name, picture, location}&limit=5',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const deletePostFromPage = ({postId, pageAccessToken}) => {
  if(postId && Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: (pageAccessToken) ? pageAccessToken : token,
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.call('DELETE', 'https://graph.facebook.com/' + postId,
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const getDataFromNextURL = ({nextURL}) => {
  if(Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.call('GET', nextURL,
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const getPageAccessToken = ({pageId}) => {
  if(Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }

    return new Promise((resolve, reject) => {
      HTTP.call('GET', 'https://graph.facebook.com/' + pageId + '?fields=access_token',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const getPostComments = ({postId}) => {
  if(Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.call('GET', 'https://graph.facebook.com/' + postId + '?fields=comments',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const getUserImageUrl = ({userId}) => {
  if(Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.call('GET', 'https://graph.facebook.com/' + userId + '?fields=picture',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const writeCommentToPost = ({postId, message}) => {
  if(Meteor.user()) {
    const token = Meteor.user().services.facebook.accessToken;
    const options = {
      params: {
        access_token: token,
        message
      }
    }
    return new Promise((resolve, reject) => {
      HTTP.call('POST', 'https://graph.facebook.com/' + postId + '/comments',
               options,
               (err, result) => {
                                  if(err)
                                    reject(err);
                                  resolve(result);})
    })
  }
}

const facebookRequestHandler = (action, params) => {
  switch(action) {
    case FBConstant.GET_AVAILABLE_PAGE_LIST:
      return getAvailablePageList();
      break;
    case FBConstant.POST_TO_PAGE:
      return postToPage(params);
      break;
    case FBConstant.GET_PAGE_INFO:
      return getPageInfo(params);
      break;
    case FBConstant.GET_POSTS_FROM_PAGE:
      return getPostsFromPage(params);
      break;
    case FBConstant.DELETE_POST_FROM_PAGE:
      return deletePostFromPage(params);
      break;
    case FBConstant.GET_DATA_FROM_NEXT_URL:
      return getDataFromNextURL(params);
      break;
    case FBConstant.GET_PAGE_ACCESS_TOKEN:
      return getPageAccessToken(params);
      break;
    case FBConstant.GET_POST_COMMENTS:
      return getPostComments(params);
      break;
    case FBConstant.GET_USER_IMAGE_URL:
      return getUserImageUrl(params);
      break;
    case FBConstant.WRITE_COMMENT_TO_POST:
      return writeCommentToPost(params);
      break;
  }
};
export default facebookRequestHandler;
