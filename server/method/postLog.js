import PostLog from '../../collection/postLog'

Meteor.methods({
  'postLog.insert'({postId, type}) {
    const result = PostLog.insert({
      postId,
      type,
      createdAt: new Date(),
    });

    if(result === false) {
      throw new Meteor.Error('Cannot insert into Post Log table');
    }
    return result;
  }
})
