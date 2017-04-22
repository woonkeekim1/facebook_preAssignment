import facebookRequestHandler from './FB'
import * as FBConstant from './facebook-constant'

Template.registerHelper('dateDiff', (date) =>
    moment(date).fromNow()
);

Template.registerHelper('getUserImageUrl', (userId, callBack) => {
  facebookRequestHandler(FBConstant.GET_USER_IMAGE_URL, {userId})
  .then(response => callBack(response))
  .catch(err => console.log(err))
})
