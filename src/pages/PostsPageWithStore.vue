<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex'

export default {
  components: {

    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePosts: 'post/loadMorePosts',
      fetchPosts: 'post/fetchPosts'
    }),
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
    /*changePage(pageNumber) {
      this.page = pageNumber
    },*/


  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      sortedOptions: state => state.post.sortedOptions,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  }
}
</script>

<template>
  <div>
    <!--    <h1>{{$store.getters.doubleLikes}}</h1>
        <h2>{{$store.state.likes}}</h2>
        <h2>{{$store.state.isAuth ? 'User Logged in' : 'Please Log in'}}</h2>
        <div>
          <my-button @click="$store.commit('incrementLikes')">Inc</my-button>
          <my-button @click="$store.commit('decrementLikes')">Dec</my-button>
        </div>-->
    <my-input v-focus placeholder="Search..." :model-value="searchQuery" @update:model-value="setSearchQuery"/>
    <div class="app__btns">
      <my-button @click="showDialog">
        Create post
      </my-button>
      <my-select :model-value="selectedSort" :options="sortedOptions" @update:model-value="setSelectedSort"/>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"/>
    </my-dialog>
    <post-list
        v-if="!isPostLoading"
        @remove="removePost"
        :posts="sortedAndSearchedPosts"
    />
    <div v-else>Loading...</div>
    <!--    <div class="page__wrapper">
          <div @click="changePage(pageNumber)" :class="{
           ' current-page' : page === pageNumber
          }" class="page" :key="page" v-for="pageNumber in totalPages">
            {{ pageNumber }}
          </div>
        </div>-->
    <div v-intersection="loadMorePosts" ref="observer" class="observer"></div>
  </div>

</template>

<style>


.app__btns {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

/*.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}*/

.observer {

}
</style>
