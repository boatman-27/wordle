import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WordProvider } from "./context/WordContext.tsx";

createRoot(document.getElementById("root")!).render(
  <WordProvider>
    <App />
  </WordProvider>
);
