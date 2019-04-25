import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import fetch from "unfetch";

const client = new ApolloClient({ uri: "/graphql", fetch });

export default ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
