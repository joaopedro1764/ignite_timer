import styled from "styled-components";
import { defaultTheme } from "../Componentes/styles/default";

type ThemeType = typeof defaultTheme;

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType { }
}