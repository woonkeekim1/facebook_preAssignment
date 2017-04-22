import facebookRequestHandler from '../../../lib/FB'
import * as FBConstant from '../../../lib/facebook-constant'

Template.post.onCreated(function() {
  this.pageAccessToken = new ReactiveVar(null)
  Template.instance().pageAccessToken.set(this.data.pageAccessToken)
})

Template.post.helpers({
  pageAccessToken() {
    return Template.instance().pageAccessToken.get();
  },
})


Template.post.events({
  'click .post-action-container'(event) {
    event.stopPropagation();
    $(event.target).siblings('.post-action-dropdown').toggle()
  },
  'click .edit'(event) {
    const postid = $(event.target).closest('.post-container')[0].dataset.postid
    location.reload();
    $(event.target).closest('.post-action-dropdown').toggle()
  },
  'click .delete'(event) {
    const postId = $(event.target).closest('.post-container')[0].dataset.postid
    const pageAccessToken = Session.get('pageAccessToken');
    facebookRequestHandler(FBConstant.DELETE_POST_FROM_PAGE, {postId, pageAccessToken})
      .then(response => $(event.target).closest('.post-container').remove())
      .catch(err => console.log(err));
    $(event.target).closest('.post-action-dropdown').toggle()
  },
})
