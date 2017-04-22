import Post from '../../collection/post'

Meteor.methods({
  'post.insert' ({message, postId, pageId, postedBy}) {
    const result = Post.insert({
      message,
      postId,
      pageId,
      postedBy,
      postedAt: new Date(),
    });
  },
  'post.getPagePosts'({pageId}) {
    const postedBy = Meteor.user()._id;
    const result = Post.find({pageId, postedBy}).fetch();
    return result;
  }
});
