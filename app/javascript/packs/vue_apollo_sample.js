import Vue from 'vue/dist/vue.esm.js'
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3008/graphql",
  request: async operation => {
    operation.setContext({
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content'),
      },
    });
  }
});

const apolloProvider = new VueApollo({
  defaultClient: client
});

Vue.use(VueApollo);

document.addEventListener('DOMContentLoaded', () => {
  const ALL_TASK_QUERY = gql`
  query allTask{
    allTask {
      id
      title
      status
      priority
    }
  }`

  const SEARCH_TASK_QUERY = gql`
  query taskSearchBy($taskName: String!){
    taskSearchBy(taskName: $taskName) {
      id
      title
      status
      priority
    }
  }`

  const app = new Vue({
    el: '#mount_target',
    apolloProvider: apolloProvider,
    mounted() {
      self = this;
      this.$apollo.query({
        query: ALL_TASK_QUERY
      })
        .then(function (result) {
          self.tasks = result.data.allTask;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    data: {
      tasks: [],
    },
    methods: {
      search: function (e) {
        if(e.target.value == null) return
        this.$apollo.query({
          query: SEARCH_TASK_QUERY,
          variables: {
            taskName: e.target.value
          }
        })
          .then(function (result) {
            self.tasks = result.data.taskSearchBy;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  })
})
