import { Mongo } from 'meteor/mongo'

const postSchema = new SimpleSchema({
    contents: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
});

const Post = new Mongo.Collection('posts');
Post.attachSchema(postSchema);
export default Post;
