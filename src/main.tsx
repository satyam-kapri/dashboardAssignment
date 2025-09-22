import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
// Importing global styles
createRoot(document.getElementById("root")!).render(<App />);
