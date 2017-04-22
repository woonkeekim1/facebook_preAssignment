import { Mongo } from 'meteor/mongo'

const postSchema = new SimpleSchema({
    message: {
      type: String,
    },
    postId: {
      type: String,
    },
    pageId: {
      type: String,
    },
    postedBy: {
      type: String,
    },
    postedAt: {
      type: Date,
    },
});

const Post = new Mongo.Collection('posts');
Post.attachSchema(postSchema);
export default Post;
