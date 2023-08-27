<template>
  <div class="Post">
    <h1>This is a post</h1>
    <p>Title: {{ post.title }}</p>
    <p>Message: {{ post.message }}</p>
  </div>
</template>

<script>
export default {
  name: "PostView",
  data() {
    return {
      post: null,
    };
  },
  methods: {
    createPostInstance() {
      // Define the UWA model directly
      const Post = window.UWA.Class.Model.extend(window.UWA.Class.Debug, {
        urlRoot: "/posts",

        defaults: {
          title: "defaulttitle",
          message: "defaultmessage",
        },

        setup: function () {
          const that = this;
          that.log("Welcome to this post");
        },
      });

      // Create an instance of the Post model
      this.post = new Post();

      // Access the methods and properties of the post instance
      this.post.log("Logging from the post instance");
    },
  },
  created() {
    // Create the post instance when the component is created
    this.createPostInstance();
  },
};
</script>
