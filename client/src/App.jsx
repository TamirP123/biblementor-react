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
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AskAI from "./pages/AskAI";

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
    <GoogleOAuthProvider clientId="990799208592-a7a76168ber6ppa1ce8nbkdbcs9id61t.apps.googleusercontent.com">
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <ScrollToTop />
          {!isAdmin && <NavbarComponent />}
          <main className="main-content">
            <Outlet />
          </main>
          <Footer/>
        </ThemeProvider>
      </ApolloProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
