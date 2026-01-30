
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ThemeProvider } from "./context/ThemeContext";
import { TableProvider } from "./context/TableContext";
import "./styles/index.css";

import { MenuProvider } from "./context/MenuContext";

import { HistoryProvider } from "./context/HistoryContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <TableProvider>
      <MenuProvider>
        <HistoryProvider>
          <App />
        </HistoryProvider>
      </MenuProvider>
    </TableProvider>
  </ThemeProvider>
);
