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
      page: 1,
      limit: 10,
      totalPages: 10,
      selectedSort: '',
      searchQuery: '',
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
    /*changePage(pageNumber) {
      this.page = pageNumber
    },*/
    async fetchPosts() {
      this.isPostLoading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isPostLoading = false
      }
    },
    async loadMorePosts() {
      this.page += 1
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('Error')
      }
    }
  },
  mounted() {
    this.fetchPosts()
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }
    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery))
    }
  },
  /* watch: {
     selectedSort(newValue) {
       this.posts.sort((post1, post2) => {
         return post1[newValue]?.localeCompare(post2[newValue])
       })
     }
   }*/
  watch: {
    /*page() {
      this.fetchPosts()
    }*/
  }
}
</script>

<template>
  <div class="app">
    <h1>Page with posts</h1>
    <my-input placeholder="Search..." v-model="searchQuery"/>
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
    <!--    <div class="page__wrapper">
          <div @click="changePage(pageNumber)" :class="{
           ' current-page' : page === pageNumber
          }" class="page" :key="page" v-for="pageNumber in totalPages">
            {{ pageNumber }}
          </div>
        </div>-->
    <div ref="observer" class="observer"></div>
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

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 2px solid teal;
}

.observer {

}
</style>
