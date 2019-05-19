import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import ApolloClient from "apollo-client";
import fetch from "unfetch";

const GRAPHQL_ENDPOINT = "/graphql";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    new HttpLink({
      fetch,
      uri: GRAPHQL_ENDPOINT,
      credentials: "same-origin"
    })
  ])
});

export default client;
