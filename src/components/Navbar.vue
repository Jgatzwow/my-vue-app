<template>
  <div class="navbar">
    <div @click="$router.push('/')">
      Learning Vue
    </div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button @click="$router.push('/about')" style="margin-left: 20px">About us</my-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

.navbar {
  height: 50px;
  background: #bebdbd;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
}
</style>