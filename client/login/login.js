import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

Template.login.onCreated(function(){
  this.isLogin = new ReactiveVar(true);
});

Template.login.helpers({
  isLogin() {
    return Template.instance().isLogin.get();
  }
})

Template.login.events({
  'submit .login-form'(event, template) {
    event.preventDefault();
    const target = event.target;
    const email = target.email.value;
    const password = target.password.value;

    if(template.isLogin.get()) {
      Meteor.loginWithPassword(email, password, (err) => {
        if (err) {
          console.log(err);
        } else {
          Router.go('/');
        }
      })
    } else {
      Accounts.createUser({email, password}, (err) => {
        if (err) {
          console.log(err);
        } else {
          Router.go('/');
        }
      })
    }
  },
  'click #loginState'(event, template) {
    event.preventDefault();
    console.log(template.isLogin)
    template.isLogin.set(!template.isLogin.get());
  },
  'click input[type=button]'(event) {
    event.preventDefault();
    Meteor.loginWithFacebook({requestPermissions: ['publish_pages', 'manage_pages', 'publish_actions']}, function(err){
            if (err) {
                console.log('Handle errors here: ', err);
            } else {
                Router.go('/');
            }
        });
  }
})
