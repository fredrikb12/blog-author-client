import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styled/GlobalStyle";
import Header from "./Header";

function App() {
  const [user, setUser] = useState(null);
  const theme = {
    main: "#E06B7A",
    darkShade: "#121527",
    darkAccent: "#717DA4",
    lightShade: "#F0F0EB",
    lightAccent: "A8A0A5",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <GlobalStyle />
        <Outlet context={[user, setUser]} />
      </ThemeProvider>
    </>
  );
}

export default App;
