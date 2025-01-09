import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Componentes/styles/default";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { GlobalStyle } from "./Componentes/styles/global";
import { CycleContextProvider } from "./contexts/CycleContext";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CycleContextProvider>
          <Router />
        </CycleContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  );
}
