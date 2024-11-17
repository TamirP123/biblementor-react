import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import "./App.css";
import { setContext } from "@apollo/client/link/context";
import Auth from "./utils/auth";
import NavbarComponent from "./components/NavbarComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const isAdmin =
    Auth.loggedIn() && Auth.getProfile().authenticatedPerson.isAdmin;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        {!isAdmin && <NavbarComponent />}
        <Outlet />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
