import PostLog from '../../collection/postLog'

Meteor.methods({
  'postLog.insert'({postId, pageId, postedBy, type}) {
    const result = PostLog.insert({
      postId,
      pageId,
      postedBy,
      type,
      postedAt: new Date(),
    });

    if(result === false) {
      throw new Meteor.Error('Cannot insert into Post Log table');
    }
    return result;
  }
})
