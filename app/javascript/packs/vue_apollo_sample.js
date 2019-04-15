import Vue from 'vue/dist/vue.esm.js'
import ApolloClient from "apollo-client"
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloLink, concat} from 'apollo-link';
import gql from 'graphql-tag'

const httpLink = new HttpLink({uri: "http://localhost:3008/graphql"});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content'),
    },
  });
  return forward(operation);
});

const apolloClient = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

document.addEventListener('DOMContentLoaded', () => {
  const TASK_QUERY = gql`
  query allTask{
    allTask {
      id
      title
      status
      priority
    }
  }`

  const app = new Vue({
    el: '#mount_target',
    async mounted() {
      self = this;
      apolloClient.query({
        query: TASK_QUERY
      })
        .then(function (result) {
          self.allTask = result.data.allTask;
        })
        .catch(error => console.log(error));
    },
    data: {
      allTask: [],
    }
  })
})
