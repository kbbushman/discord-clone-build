import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import customTheme from "utils/theme";
import GlobalState from "./components/sections/GlobalState";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: 0,
    },
  },
});

export default function AppProviders({ children }) {
  return (
    <QueryClientProvider client={client}>
      <ColorModeScript />
      <ChakraProvider theme={customTheme}>
        <GlobalState>
          <Router>{children}</Router>
        </GlobalState>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
