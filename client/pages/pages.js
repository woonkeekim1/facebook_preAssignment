import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import facebookRequestHandler from '../lib/FB'
import * as FBConstant from '../lib/facebook-constant'



Template.pages.onCreated(function() {
  Session.set('pages', null);
  Session.set('pages.details', null);
  if(Meteor.user() && Meteor.user().services.facebook) {
    facebookRequestHandler(FBConstant.GET_AVAILABLE_PAGE_LIST)
    .then(response => {
      Session.set('pages', response.data.data);
      return response.data.data;
    })
  }
})

Template.pages.helpers({
  pages() {
    if(!Session.get('pages') && Meteor.user().services.facebook) {
      facebookRequestHandler(FBConstant.GET_AVAILABLE_PAGE_LIST)
      .then(response => {
        Session.set('pages', response.data.data);
        return response.data.data;
      })

    }
    return Session.get('pages')
  },
})

Template.pages.events({
  'click .page-header'(event) {
    const page = $(event.target).closest('.page-container');
    const posts = page.find('.page-post-container').toggle();
  },
  'click .add-button'(event) {
    const form = $(event.target).siblings('.add-form');
    form.toggle()
  },
})
