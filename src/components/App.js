import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styled/GlobalStyle";
import Header from "./Header";

function App() {
  const [user, setUser] = useState(null);
  const theme = {
    main: "#EC9CA6",
    darkShade: "#121527",
    darkAccent: "#717DA4",
    lightShade: "#F0F0EB",
    lightAccent: "#A8A0A5",
    lightAccentHover: "#85737E",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Outlet context={[user, setUser]} />
      </ThemeProvider>
    </>
  );
}

export default App;
