<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import {usePosts} from '@/hooks/usePosts';
import useSortedPosts from '@/hooks/useSortedPosts';
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts';

export default {
  components: {

    PostList, PostForm
  },
  data() {
    return {
      dialogVisible: false,
      sortedOptions: [
        {value: 'title', name: 'By name'},
        {value: 'body', name: 'By description'},
      ]
    }
  },
  setup(props) {
    const {isPostsLoading, posts, totalPages} = usePosts(10, 1)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
    return {
      posts, totalPages, isPostsLoading, sortedPosts, selectedSort, sortedAndSearchedPosts, searchQuery
    }
  }
}
</script>

<template>
  <div>
    <h1>Page with posts</h1>
    <my-input v-focus placeholder="Search..." v-model="searchQuery"/>
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
        :posts="sortedAndSearchedPosts"
    />
    <div v-else>Loading...</div>
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
