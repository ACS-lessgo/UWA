<template>
  <div class="Posts">
    <h1>This is posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.cid">
        {{ post.get("title") }} - {{ post.get("message") }}
      </li>
    </ul>
  </div>
</template>

<script>
import PostView from "./PostView.vue";
export default {
  name: "PostsView",
  data() {
    return {
      posts: [],
    };
  },
  methods: {
    definePostsCollection(Collection, Post) {
      const Posts = Collection.extend({
        url: "/posts",
        model: Post,
      });

      return Posts;
    },
    fetchPosts() {
      const PostsCollection = this.definePostsCollection(
        window.UWA.Class.Collection,
        PostView // Replace with your Post model
      );

      const postsList = new PostsCollection();

      // Fetch data from the backend and populate the posts array
      postsList.fetch({
        reset: true,
        onComplete: (posts, response, options) => {
          this.posts = posts.toArray();
          console.log(posts.toArray(), response, options);
        },
        onFailure: (posts, response, options) => {
          console.error("Error fetching posts.");
          console.log(posts.toArray(), response, options);
        },
      });
    },
  },
  created() {
    this.fetchPosts();
  },
};
</script>
