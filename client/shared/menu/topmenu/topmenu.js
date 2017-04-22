Template.topmenu.events({
  'click .top-menu-more'(event) {
    $(event.target).siblings('.top-menu').toggle()
    event.stopPropagation();
  },
  'click #pages'(event){
    event.preventDefault();
    $('.top-menu').toggle();
    Router.go('/pages');
  },
  'click #logout'(event) {
    event.preventDefault();
    $('.top-menu').toggle();
    Meteor.logout();
  },
})

$(document).click(function (event) {
  $('.top-menu').hide()
  event.stopPropagation();
});
