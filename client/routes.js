Meteor.Router.add({
  '/': function () {
    return 'home';
  },

  '/admin': 'adminHome',
  '/admin/posts': 'adminPostList',
  '/admin/posts/new': function () {
    // set the postId to a new unique id
    Session.set('postId', Meteor.uuid());
    // postIsNew to true; we will be using this value in the view
    Session.set('postIsNew', true);
    return 'adminPostDetail';
  },
  '/admin/posts/:slug': function (id) {
    // Set the session var 'postId' - we will use this value in our
    // template helper to query for the correct post.
    Session.set('postId', id);
    // postIsNew to false; we will be using this value in the view
    Session.set('postIsNew', false);
    return 'adminPostDetail';
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
