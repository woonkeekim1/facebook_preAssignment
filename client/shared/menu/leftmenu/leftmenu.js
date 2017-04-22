Template.leftmenu.events({
  'click #pages'(event){
    event.preventDefault();
    Router.go('/pages');
  },
  'click #logout'(event) {
    event.preventDefault();
    Meteor.logout();
  },
})
