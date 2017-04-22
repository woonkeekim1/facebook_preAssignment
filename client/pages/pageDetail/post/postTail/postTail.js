import facebookRequestHandler from '../../../../lib/FB'
import * as FBConstant from '../../../../lib/facebook-constant'


Template.postTail.onCreated(function() {
  this.userImageURL = new ReactiveVar(null)
  this.comments = new ReactiveVar();
  this.newCommentPosted = new ReactiveVar(true);
})

Template.postTail.helpers({
  comments() {
    const postId = this.postId;
    const key = 'comments_' + postId
    const instance= Template.instance();
    if(Meteor.user()) {
      if(!instance.comments.get() || instance.newCommentPosted.get()) {
        instance.newCommentPosted.set(false)
        facebookRequestHandler(FBConstant.GET_POST_COMMENTS, {postId})
        .then(response => {
          if(response.data.comments) {
            instance.comments.set(response.data.comments.data)
          }
        })
        .catch(err => console.log(err))
      }
    }
    return instance.comments.get()
  },
  userImageUrl() {
    if(Meteor.user() && !Template.instance().userImageURL.get()) {
      const instance = Template.instance();
      const userId = Meteor.user().services.facebook.id;
      Blaze._globalHelpers.getUserImageUrl(userId, (response) => {
        if(response.data) {
          instance.userImageURL.set(response.data.picture.data.url)
        }
      });
    }
    return Template.instance().userImageURL.get();
  }
})

Template.postTail.events({
  'click #comment'(event) {
    $(event.currentTarget).closest('.post-tail-container').siblings('.post-tail-comment').toggle()
  },
  'keyup .comment-input-container'(event) {
    if(event.keyCode == 13 && !event.shiftKey) {
      const postId = this.postId;
      const message = event.currentTarget.innerText;
      const instance = Template.instance();

      //write comment
      facebookRequestHandler(FBConstant.WRITE_COMMENT_TO_POST, {postId, message})
      .then(response => {
        instance.newCommentPosted.set(true)
      })
      .catch(err => console.log(err))

      event.currentTarget.innerText = ''
    }
  }
});
