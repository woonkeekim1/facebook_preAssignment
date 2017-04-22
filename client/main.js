import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { getAvailablePageList } from './lib/FB'

import './main.html';

Template.main.onCreated(function() {
  Session.set('pages', [])
})

Template.main.helpers({
})
