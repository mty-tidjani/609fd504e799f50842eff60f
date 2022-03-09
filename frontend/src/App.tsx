import React from "react";
import "./App.css";
import { AppContextProvider } from "./ui/contexts/AppCotext";
import { Router } from "./ui/Router";

function App() {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
}

export default App;
