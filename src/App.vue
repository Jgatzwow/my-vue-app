<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';

export default {
  components: {

    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostLoading: false,
      selectedSort: '',
      sortedOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'},
      ]
    }
  },
  methods: {
    createPost(post) {
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    async fetchPosts() {
      this.isPostLoading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
  }
}
</script>

<template>
  <div class="app">
    <h1>Page with posts</h1>
    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select v-model="selectedSort" :options="sortedOptions"/>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
        v-if="!isPostLoading"
        @remove="removePost"
        :posts="posts"
    />
    <div v-else>Loading...</div>
  </div>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
</style>
