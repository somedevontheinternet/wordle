import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./Words.ts";

createRoot(document.getElementById("root")!).render(<App />);
