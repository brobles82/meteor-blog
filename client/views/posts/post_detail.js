Template.postDetail.post = function () {
  // use the 'postId' session variable to retrieve the correct session
  // based on the url.
  return Posts.findOne({_id: Session.get('postId')});
};
