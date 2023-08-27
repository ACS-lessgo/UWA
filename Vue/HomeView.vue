<!-- <template>
  <div class="home">
    <h1>This is home page</h1>
    <button class="post-btn" @click="postData">POST</button>
    <button class="put-btn" @click="updateData">UPDATE</button>
    <button class="delete-btn" @click="deleteData">DELETE</button>
    <div ref="datagridContainer" class="datagrid-container"></div>
  </div>
</template>

<script>
import axios from "axios";
//import PostView from "./PostView.vue";

export default {
  name: "HomeView",
  data() {
    return {
      uwaDatagridView1: null,
      // collection1: new window.UWA.Class.collection({
      //   url: "/blogposts",
      //   model: PostView,
      // }),
      collection: [],
    };
  },
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      this.fetchData();
    },
    renderDataGrid() {
      this.uwaDatagridView1 = new window.UWA.Controls.DataGrid({
        className: "my-dataGrid",
        columns: [
          {
            text: "id",
            dataIndex: "id",
          },
          {
            text: "title",
            dataIndex: "title",
          },
          {
            text: "message",
            dataIndex: "message",
          },
        ],
        data: this.collection,
      });
      console.log("inside the render function");
      this.uwaDatagridView1.inject(this.$refs.datagridContainer);
      this.uwaDatagridView1.addScroller();
    },
    fetchData() {
      axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("data from api recieved");
          this.collection = response.data;
          this.renderDataGrid();
        })
        .catch((error) => {
          console.error("Fetch failure", error);
        });
    },
    postData() {
      var that = this;
      let postTitle = prompt("Enter new post title");
      let postMessage = prompt("Enter new post message");
      window.UWA.log("post was clicked!");
      console.log(that);
      that.collection.create(
        {
          title: postTitle,
          message: postMessage,
        },
        {
          onComplete: function (post, response) {
            console.log(response);
            console.log("Successfully saved!");
          },
          onFailure: function (post, error) {
            console.log(post.JSON());
            post.log(error.responseText);
          },
        }
      );
    },
    create(postTitle, postMessage) {
      var that = this;
      that.collection.push({
        title: postTitle,
        message: postMessage,
      });
    },
    updateData() {
      var that = this;
      let newIndex = prompt("Enter id to change");
      let newPostTitle = prompt("Enter new title");
      window.UWA.log("put was clicked!");
      that.collection.at(+newIndex).save(
        { title: newPostTitle },
        {
          onComplete: function (post, response) {
            console.log("Successfully updated title!");
            console.log(post + response);
          },
          onFailure: function (post, error) {
            console.log(post.toJSON());
            post.log(error.responseText);
          },
        }
      );
    },
    deleteData() {
      var that = this;
      let deleteIndex = prompt("Enter index to be deleted");
      window.UWA.log("delete was clicked!");

      // Convert deleteIndex to a number
      deleteIndex = +deleteIndex;

      if (deleteIndex >= 0 && deleteIndex < that.collection.length) {
        // Remove the element at deleteIndex from the collection array
        let deletedElement = that.collection.splice(deleteIndex, 1)[0];

        if (deletedElement) {
          console.log("Successfully deleted title!", deletedElement);
        } else {
          console.log("Failed to delete element.");
        }
      } else {
        console.log("Invalid index.");
      }
    },
  },
};
</script> -->

<template>
  <div class="home">
    <h1>This is home page</h1>
    <button class="post-btn" @click="postData">POST</button>
    <button class="put-btn" @click="updateData">UPDATE</button>
    <button class="delete-btn" @click="deleteData">DELETE</button>
    <div ref="datagridContainer" class="datagrid-container"></div>
  </div>
</template>

<script>
import axios from "axios";
import PostView from "./PostView.vue"; // Import your Post model

export default {
  name: "HomeView",
  data() {
    return {
      collection: [],
      uwaDatagridView1: null,
    };
  },
  mounted() {
    this.setup();
  },
  methods: {
    setup() {
      this.fetchData();
    },
    renderDataGrid() {
      // Render your data grid using this.collection
      this.uwaDatagridView1 = new window.UWA.Controls.DataGrid({
        className: "my-dataGrid",
        columns: [
          {
            text: "id",
            dataIndex: "id",
          },
          {
            text: "title",
            dataIndex: "title",
          },
          {
            text: "message",
            dataIndex: "message",
          },
        ],
        data: this.collection,
      });
      console.log("inside the render function");
      this.uwaDatagridView1.inject(this.$refs.datagridContainer);
      this.uwaDatagridView1.addScroller();
    },
    fetchData() {
      axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("Fetched data from API:", response.data);
          this.collection = response.data.map((postData) => {
            // Create a new Post model instance for each fetched data
            return new PostView({
              id: postData.id,
              title: postData.title,
              message: postData.message,
            });
          });

          // Render the data grid after fetching and processing data
          this.renderDataGrid();
        })
        .catch((error) => {
          console.error("Fetch failure", error);
        });
    },
    postData() {
      const postTitle = prompt("Enter new post title");
      const postMessage = prompt("Enter new post message");

      axios
        .post("http://localhost:3000/posts", {
          title: postTitle,
          message: postMessage,
        })
        .then((response) => {
          console.log("Successfully posted data!");

          // Create a new Post model instance
          const newPost = new PostView({
            id: response.data.id, // Assuming API returns ID
            title: postTitle,
            message: postMessage,
          });

          // Add the new post instance to the collection
          this.collection.push(newPost);

          // Refresh the data grid
          this.renderDataGrid();
        })
        .catch((error) => {
          console.error("Post failure", error);
        });
    },
    updateData() {
      // Handle updating data
    },
    deleteData() {
      // Handle deleting data
    },
  },
};
</script>
