import facebookRequestHandler from '../../lib/FB'
import * as FBConstant from '../../lib/facebook-constant'

Template.pageDetail.onCreated(function() {
  if(Meteor.user()) {
    const pageId = this.data.pageId;

    facebookRequestHandler(FBConstant.GET_PAGE_ACCESS_TOKEN, {pageId})
    .then(response =>
      Session.set('pageAccessToken', response.data.access_token))
    .catch(err => console.log(err));

    facebookRequestHandler(FBConstant.GET_PAGE_INFO, {pageId})
    .then(response =>
      Session.set('pageName', response.data.name))
    .catch(err => console.log(err));

    Session.set('postType', 'published');
    facebookRequestHandler(FBConstant.GET_POSTS_FROM_PAGE, {pageId, true})
    .then(response => {
      Session.set('nextURL', response.data.paging.next)
      Session.set('posts', response.data.data);
    })
    .catch(err => console.log('you dont have permission'));
  }
})

Template.pageDetail.onRendered(function() {
  if(Meteor.userId()) {
    Session.set('posts', null);
    Session.set('pageAccessToken', null);
    Session.set('nextURL', null);
    Session.set('postType', 'published');
    Session.set('pageName', null);

    const pageId = this.data.pageId;
    facebookRequestHandler(FBConstant.GET_PAGE_ACCESS_TOKEN, {pageId})
    .then(response =>
      Session.set('pageAccessToken', response.data.access_token))
    .catch(err => console.log(err));
  }
})

Template.pageDetail.helpers({
  pageName() {
    if(!Session.get('pageName') && Meteor.user()) {
      const pageId = this.pageId;
      facebookRequestHandler(FBConstant.GET_PAGE_INFO, {pageId}).then(response =>
        Session.set('pageName', response.data.name))
      .catch(err => console.log(err));
    }
    return Session.get('pageName')
  },
  postList() {
    if(!Session.get('posts') && Meteor.user()) {
      const pageId = this.pageId;
      const isPublish = (Session.get('postType') == 'published') ? true : false;
      facebookRequestHandler(FBConstant.GET_POSTS_FROM_PAGE, {pageId, isPublish}).then(response => {
        Session.set('nextURL', response.data.paging.next)
        Session.set('posts', response.data.data);
      })
      .catch(err => console.log('you dont have permission'));
    }
    return  Session.get('posts');
  },
  pageAccessToken() {
    return Session.get('pageAccessToken')
  },
})

Template.pageDetail.events({
  'click .add-button'(event) {
    $('.add-form').slideToggle();
  },
  'click body'(event) {
    $(event.target).find('.post-action-dropdown').hide()
  },
  'focus .editable-div'(event) {
    $(event.target).removeClass('editable-div-error');
  },
  'submit .add-form'(event) {
    event.stopPropagation();
    event.preventDefault();
    const message = $(event.target).find('[name=message]')[0].innerHTML;
    if(!message) {
      $(event.target).find('.editable-div').addClass('editable-div-error');
      return;
    }
    const published = event.target.published.checked
    const pageId = this.pageId;
    const postedBy = Meteor.user()._id;
    const type = 'insert';
    const pageAccessToken = Session.get('pageAccessToken');
    facebookRequestHandler(FBConstant.POST_TO_PAGE, {pageId, message, published, pageAccessToken})
    .then(response => {
      const postId = response.data.id;
      Meteor.call('post.insert', {
        message,
        postId,
        pageId,
        postedBy,
      }, (err, response) => {
        if(response) {
          Meteor.call('postLog.insert', {
            postId,
            pageId,
            postedBy,
            type,
          });
        }
      });
    })
    .catch(err => console.log(err))
    $(event.target).find('[name=message]')[0].innerHTML = ''
    $(event.target).find('[name=published]')[0].checked = false;
    document.location.reload();
  },
  'change .post-type-filter'(event) {
    const selectedValue = event.currentTarget.value
    Session.set('postType', selectedValue)

    const pageId = this.pageId;
    const isPublish = (Session.get('postType') == 'published') ? true : false;
    facebookRequestHandler(FBConstant.GET_POSTS_FROM_PAGE, {pageId, isPublish}).then(response => {
      Session.set('nextURL', response.data.paging.next)
      Session.set('posts', response.data.data);
    })
    .catch(err =>
      {
        console.log('you dont have permission');
        event.currentTarget.selectedIndex = 0;
        Session.set('postType', 'published')
      });
  }
})

function showMoreVisible() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      if(!Session.get('loading')) {
        Session.set('loading', true);
        const nextURL = Session.get('nextURL');

        facebookRequestHandler(FBConstant.GET_DATA_FROM_NEXT_URL, {nextURL})
        .then(response => {
          if(response.data) {
            const posts = [...Session.get('posts')]
            response.data.data.forEach(data => {posts.push(data)});
            Session.set('posts', posts);
            if(response.data.paging) {
              const nextURL = response.data.paging.next;
              Session.set('nextURL', nextURL);
            }
          }
          Session.set('loading', false);
        })
        .catch(err => console.log(err))
      }
    }
}

// run the above func every time the user scrolls
$(window).scroll(showMoreVisible);
