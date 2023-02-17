<template>
  <form @submit.prevent>
    <h4>Post Creation</h4>
    <input
        @input="title = $event.currentTarget.value"
        v-bind:value="title"
        class="input"
        type="text"
        placeholder="Post name"
    >
    <input
        @input="body = $event.currentTarget.value"
        v-bind:value="body"
        class="input"
        type="text"
        placeholder="Post description"
    >
    <button class="btn">create post</button>
  </form>
</template>

<script>
export default {}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 100%;
  border-top: 1px solid teal;
  padding: 10px 15px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.btn {
  align-self: flex-end;
  padding: 10px 15px;
  color: teal;
  background: none;
  border: 1px solid teal;
}
</style>