Template.adminPostListItem.helpers({
  //isPublished: function (e) {
    //console.log('val: ', e);
  //}
});


Template.adminPostListItem.events({
  'click .delete': function (e, template) {
    e.preventDefault();
    var remove = window.confirm("Are you sure you want to remove this post?");
    if (remove === true) {
      Meteor.call('postDelete', template.data._id, function (err, post) {
        if (err) {
          return throwError(err.reason);
        }
        // if no error...
        console.log('post deleted successfully');
      });
    }
  }
});
