Template.adminPostList.helpers({
  allPosts: function () {
    return Posts.find();
  }
});
