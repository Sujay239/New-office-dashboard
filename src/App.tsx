// src/App.tsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { NotificationProvider } from "./components/NotificationProvider";
import Approutes from "./routes";

const App: React.FC = () => {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <Approutes />
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
};

export default App;
