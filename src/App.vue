<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';


export default {
  components: {
    PostList, PostForm
  },
  data() {
    return {
      posts: [
        {
          id: 1, title: 'JavaScript', body: 'Post Description',
        },
        {
          id: 2, title: 'JavaScript2', body: 'Post Description2',
        },
        {
          id: 3, title: 'JavaScript3', body: 'Post Description3',
        },
        {
          id: 4, title: 'JavaScript4', body: 'Post Description4',
        },
      ],
      dialogVisible: false,
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
    }
  }
}
</script>

<template>
  <div class="app">
    <h1>Page with posts</h1>
    <my-button @click="showDialog">
      Create post
    </my-button>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
        @remove="removePost"
        :posts="posts"
    />
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
</style>
