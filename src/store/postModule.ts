import axios from "axios";

// @ts-ignore
export const postModule = {
  state: () => ({
    posts: [],
    isPostLoading: false,
    page: 1,
    limit: 10,
    totalPages: 10,
    selectedSort: "",
    searchQuery: "",
    sortedOptions: [
      { value: "title", name: "By name" },
      { value: "body", name: "By description" },
    ],
  }),
  getters: {
    sortedPosts(state: any) {
      return [...state.posts].sort((post1, post2) => {
        return post1[state.selectedSort]?.localeCompare(
          post2[state.selectedSort]
        );
      });
    },
    sortedAndSearchedPosts(state: any, getters: any) {
      return getters.sortedPosts.filter((post: any) =>
        post.title.toLowerCase().includes(state.searchQuery)
      );
    },
  },
  mutations: {
    setPosts(state: any, posts: any[]) {
      state.posts = posts;
    },
    setLoading(state: any, loading: boolean) {
      state.isPostLoading = loading;
    },
    setPage(state: any, page: number) {
      state.page = page;
    },
    setLimit(state: any, limit: number) {
      state.limit = limit;
    },
    setSelectedSort(state: any, selectedSort: any) {
      state.selectedSort = selectedSort;
    },
    setTotalPages(state: any, totalPages: number) {
      state.totalPages = totalPages;
    },
    setSearchQuery(state: any, searchQuery: string) {
      state.searchQuery = searchQuery;
    },
  },
  actions: {
    //@ts-ignore
    async fetchPosts({ state, commit, dispatch }) {
      try {
        commit("setLoading", true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setTotalPages",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", response.data);
      } catch (e) {
        alert("Error");
      } finally {
        commit("setLoading", false);
      }
    },
    //@ts-ignore
    async loadMorePosts({ state, commit }) {
      commit("setPage", state.page + 1);
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );
        commit(
          "setLimit",
          Math.ceil(response.headers["x-total-count"] / state.limit)
        );
        commit("setPosts", [...state.posts, ...response.data]);
      } catch (e) {
        alert("Error");
      }
    },
  },
  namespaced: true,
};
