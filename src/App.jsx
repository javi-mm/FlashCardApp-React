import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserPage from "./components/UserPage";
import RootLayout from "./pages/RootLayout";
import Login from "./components/Login";
import AllDecksLayout from "./pages/AllDecksLayout";
import DeckLayout from "./pages/DeckLayout";
import EditDeckLayout from "./pages/EditDeckLayout";
import ViewDeckLayout from "./pages/ViewDeckLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement:
    children: [
      { path: "/", element: <AllDecksLayout /> },
      { path: "/login", element: <Login /> },
      {
        path: "user/:userId",
        element: <UserPage />,
      },
      {
        path: "decks/:deckId",
        element: <DeckLayout />,
        children: [
          { path: "edit", element: <EditDeckLayout /> },
          { path: "view", element: <ViewDeckLayout /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
