import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";
import fetch from "unfetch";

const GRAPHQL_ENDPOINT = "/graphql";
const httpLink = new HttpLink({
  fetch,
  uri: GRAPHQL_ENDPOINT,
  credentials: "same-origin"
});

/**
 * This function allows for subscriptions as well as server-side rendering
 * @param {object} railsContext Comes from react_on_rails, used to differentiate between server-rendering and client
 */
const createClient = railsContext => {
  // Client-side
  if (!railsContext) {
    const ActionCable = require("actioncable");
    const ActionCableLink = require("graphql-ruby-client/subscriptions/ActionCableLink");

    const cable = ActionCable.createConsumer();

    const hasSubscriptionOperation = ({ query: { definitions } }) => {
      return definitions.some(
        ({ kind, operation }) =>
          kind === "OperationDefinition" && operation === "subscription"
      );
    };

    return new ApolloClient({
      cache: new InMemoryCache(),
      link: ApolloLink.split(
        hasSubscriptionOperation,
        new ActionCableLink({ cable }),
        httpLink
      )
    });
  }

  // Server-side
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([httpLink])
  });
};

export default createClient;
