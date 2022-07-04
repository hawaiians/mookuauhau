import globalStyles from "../styles/global";
import { AnimatePresence } from "framer-motion";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://hiptfotokdejybmpjmbc.nhost.run/v1/graphql/",
  cache: new InMemoryCache(),
});

function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <AnimatePresence>
        <Component {...pageProps} />
      </AnimatePresence>
      <style jsx global>
        {globalStyles}
      </style>
    </ApolloProvider>
  );
}

export default App;
