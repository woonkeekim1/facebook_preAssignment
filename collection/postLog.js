import { Mongo } from 'meteor/mongo'

const postLogSchema = new SimpleSchema({
  postId: {
    type: String,
  },
  pageId: {
    type: String,
  },
  postedBy: {
    type: String,
  },
  type: {
    type: String,
    allowedValues: ['insert', 'delete', 'update']
  },
  postedAt: {
    type: Date,
  },
});

const PostLog = new Mongo.Collection('postLogs');
PostLog.attachSchema(postLogSchema);
export default PostLog;
