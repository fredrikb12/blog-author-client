import { useState } from "react";
import { Outlet } from "react-router-dom";
import { GlobalStyle } from "../styled/GlobalStyle";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <GlobalStyle />
      <Outlet context={[user, setUser]} />
    </>
  );
}

export default App;
