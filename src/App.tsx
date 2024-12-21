import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./Componentes/styles/default";
import { GloBalStyle } from "./Componentes/styles/Global";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <GloBalStyle />
    </ThemeProvider>
  )
}

