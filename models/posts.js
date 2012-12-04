var Posts = new Meteor.Collection("posts");

Meteor.methods({

  // options should include: title, body, slug
  postInsert: function (post) {
    if (!post.title) {
      throw new Meteor.Error(602, 'Please fill in a title');
    }
    if (post.title.length > 100) {
      throw new Meteor.Error(413, "Title too long");
    }
    return Posts.insert({
      creator: this.userId,
      title: post.title,
      // slugify again for good measure
      slug: slugify(post.slug),
      body: post.body
    });
  },

  // options should include: _id, title, body, slug
  postUpdate: function (post) {
    if (!post.title) {
      throw new Meteor.Error(602, 'Please fill in a title');
    }
    if (post.title.length > 100) {
      throw new Meteor.Error(413, "Title too long");
    }
    return Posts.update(post._id, {
      creator: this.userId,
      title: post.title,
      // slugify again for good measure
      slug: slugify(post.slug),
      body: post.body
    });
  },

  // options should include id
  postDelete: function (id) {
    if (!id) {
      throw new Meteor.Error(602, 'Please provide an id');
    }
    return Posts.remove(id);
  }
});
