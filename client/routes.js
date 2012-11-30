Meteor.Router.add({
  '/': function () {
    return 'home';
  },
  '/posts': function (tags) {
    // Set the query to all
    Session.set('postQuery', {});
    return 'postList';
  },
  '/posts/:id': function (id) {
    // Set the session var 'postId' - we will use this value in our
    // template helper to query for the correct post.
    Session.set('postId', id);
    return 'postDetail';
  },
  '/posts/tags/:tag': function (tag) {
    // Set the query to tags matching the passed tag
    Session.set('postQuery', {tags: tag});
    return 'postList';
  }
});
