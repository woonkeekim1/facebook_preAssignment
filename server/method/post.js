import Post from '../../collection/post'

Meteor.methods({
  'post.insert' ({contents, createdBy}) {
    const result = Post.insert({
      contents,
      createdBy,
      createdAt: new Date(),
    });

    if(result === false) {
      throw new Meteor.Error('Cannot insert into Post table');
    }
    return result;
  }
});
