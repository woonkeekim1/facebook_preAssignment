import Post from './collection/post'
import PostLog from './collection/postLog'
Router.route('/', function () {
  if(Meteor.userId()) {
    this.render('main')
  } else {
    this.redirect('login');
  }
});

Router.route('/pages', function() {
  if(Meteor.userId()) {
    this.render('pages')
  } else {
    this.redirect('login')
  }
});

Router.route('/pages/:_id', function() {
  if(Meteor.userId()) {
    const pageId = this.params._id

    this.render('pageDetail', {data: {pageId}})
  } else {
    this.redirect('login')
  }
});

Router.route('/login', function () {
  if(Meteor.userId()) {
    this.redirect('/');
  } else {
    this.render('login');
  }
});
