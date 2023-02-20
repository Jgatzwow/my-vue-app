<template>
  <form @submit.prevent>
    <h4>Post Creation</h4>
    <my-input
        v-focus
        v-model="post.title"
        type="text"
        placeholder="Post name"
    />
    <my-input
        v-model="post.body"
        type="text"
        placeholder="Post description"
    />
    <my-button @click="createPost">Create post</my-button>
  </form>
</template>

<script>

export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      },
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}


</style>