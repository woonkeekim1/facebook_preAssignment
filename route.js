import Post from './collection/post'
import PostLog from './collection/postLog'

Router.route('/', function () {
  if(Meteor.user()) {
    this.render('main')
  } else {
    this.redirect('login');
  }
});
Router.route('/login', function () {
  this.render('login');
});
