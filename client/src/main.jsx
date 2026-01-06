import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
<GoogleOAuthProvider clientId="927526265796-2ucp4ff16vjn16jmdvu35pgole2g2b51.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
  </React.StrictMode>
);
