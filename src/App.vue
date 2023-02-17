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
      title: '',
      body: ''
    }
  },
  methods: {
    createPostHandler() {
      const newPost = {
        id: Date.now(), title: this.title, body: this.body
      }
      this.posts.push(newPost)
      this.title = ''
      this.body = ''
    },
  }
}
</script>

<template>
  <div class="app">
    <post-form/>
    <post-list :posts="posts"/>
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
