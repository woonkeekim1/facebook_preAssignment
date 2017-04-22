Template.pageList.events({
  'click .page-container'(event) {
    const pageId = $(event.target).closest('.page-container')[0].dataset.pageid
    Router.go('/pages/' + pageId)
  },
});
