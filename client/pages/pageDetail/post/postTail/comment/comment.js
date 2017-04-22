Template.comment.onCreated(function() {
  this.userImageURL = new ReactiveVar(null)
})

Template.comment.helpers({
  userImageUrl(userId) {
    if(Meteor.user() && !Template.instance().userImageURL.get()) {
      const instance = Template.instance();
      Blaze._globalHelpers.getUserImageUrl(userId, (response) => {
        if(response.data) {
          instance.userImageURL.set(response.data.picture.data.url)
        }
      });
    }
    return Template.instance().userImageURL.get();
  },
})
