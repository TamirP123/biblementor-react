import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Auth from "./utils/auth.js";

const stripePromise = loadStripe(
  "pk_test_51Pss2CC5VCV0wby5OZ2mDA4Y7UXCzQZxp50KhC6wxYYcovcPV76x1eABHWwHU2DBr8BeFNoV5dVbLfA8d7418Pl400ncMpKkjH"
);

import App from "./App.jsx";
import Homepage from "./pages/Homepage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import BiblePage from "./pages/BiblePage.jsx";
import AskAI from "./pages/AskAI.jsx";
import SearchResults from "./pages/SearchResults.jsx";
import VersesPage from "./pages/VersesPage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: Auth.loggedIn() && Auth.getProfile().authenticatedPerson.isAdmin ? <AdminDashboard /> : <Homepage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "bible",
        element: <BiblePage/>,
      },
      {
        path: "ask-ai",
        element: <AskAI />,
      },
      {
        path: 'search/:query',
        element: <SearchResults />,
      },
      {
        path: 'verses/',
        element: <VersesPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <RouterProvider router={router} />
  </Elements>
);
