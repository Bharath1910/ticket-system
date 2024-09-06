import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import ChatPage from './components/chatPage';
import InitSetup from './components/initSetup';
import SetupPage from './components/setupPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
  {
    path : "/initsetup",
    element : <InitSetup />
  },
  {
    path : "/setup",
    element : <SetupPage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router} />
);
