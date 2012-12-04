// This function will be evaluated when the template is created
Template.adminPostDetail.created = function () {
  // set default values
  // 'postIsDirty' indicates that the post has been modified
  Session.set('postIsDirty', false);
  // 'postTitle' is the current post.title this will be updated in the
  // template.rendered function
  Session.set('postTitle', '');
  // 'postIsPublished' is the current post.published attribute
  Session.set('postIsPublished', false);
};

Template.adminPostDetail.rendered = function () {
  var post = Posts.findOne({_id: Session.get('postId')});
  // only set the 'postTitle' session var if we have a post and
  // the value has not already been set
  // confirm that we have a post
  if (post && !Session.get('postTitle')) {
    // if the postTitle has not been set set it.
    if (!Session.get('postTitle')) {
      Session.set('postTitle', post.title);
    }
    if (!Session.get('postIsPublished')) {
      Session.set('post', post.title);
    }
  }
};

Template.adminPostDetail.helpers({
  // post returns the current post
  post: function () {
    return Posts.findOne({_id: Session.get('postId')});
  },

  slug: function () {
    if (Session.get('postTitle')) {
      return slugify(Session.get('postTitle'));
    }
  },

  isDirty: function () {
    return Session.get('postIsDirty');
  },

  isNew: function () {
    return Session.get('postIsNew');
  },

  isPublished: function () {
    return Session.get('postIsPublished');
  }
});

Template.adminPostDetail.preserve(['.post-title', '.post-body']);

Template.adminPostDetail.events({
  'keypress .post-title': function (e) {
    Session.set('postIsDirty', true);
  },

  'keyup .post-title': function (e, template) {
    Session.set('postTitle', template.find(".post-title").value);
  },

  'keypress .post-body': function (e) {
    Session.set('postIsDirty', true);
  },

  'click .publish': function (e, template) {
    e.preventDefault();
    var post = {
      _id: Session.get('postId'),
      title: template.find(".post-title").value,
      body: template.find(".post-body").value,
      slug: template.find(".post-slug").value,
      published: true
    };

    // confirm that the fields are not blank
    if (!post.title.length && !post.body.length) {
      return throwError("Please fill in all required fields");
    }

    // Will this be an update or an insert.
    var method;
    if (Session.get('postIsNew')) {
      method = 'postInsert';
    } else {
      method = 'postUpdate';
    }

    // Pass the values the 'createPost' function the server
    Meteor.call(method, post, function (err, id) {
      if (err) {
        return throwError(err.reason);
      }
      // if no error...
      Session.set('postIsDirty', false);
      Meteor.Router.to('/admin/posts');
    });
  },

  'click .save': function (e, template) {
    e.preventDefault();

    var post = {
      _id: Session.get('postId'),
      title: template.find(".post-title").value,
      body: template.find(".post-body").value,
      slug: template.find(".post-slug").value
    };

    // confirm that the fields are not blank
    if (!post.title.length && !post.body.length) {
      return throwError("Please fill in all required fields");
    }

    // Will this be an update or an insert.
    var method;
    if (Session.get('postIsNew')) {
      method = 'postInsert';
    
    } else {
      method = 'postUpdate';
    }

    // Pass the values the 'createPost' function the server
    Meteor.call(method, post, function (err, id) {
      if (err) {
        return throwError(err.reason);
      }
      // if the post is new redirect to the correct url
      if (Session.get('postIsNew')) {
        Meteor.Router.to('/admin/posts/' + id);
      }
      // if no error...
      Session.set('postIsDirty', false);
    });
  },

  // we are using the class "cancel" instead of "close" because bootstrap 
  // has special styling for the "close" class
  'click .cancel': function (e) {
    e.preventDefault();

    // If the post has been modified notify the user the their changes will
    // be lost
    if (Session.get('postIsDirty')) {
      var exit = window.confirm("You have unsaved changes that will be lost");
      if (exit === true) {
        Meteor.Router.to('/admin/posts');
        // clean up. Set 'postIsDirty' to false
        Session.set('postIsDirty', false);
        return;
      }
    } else {
      Meteor.Router.to('/admin/posts');
    }
  }
});
