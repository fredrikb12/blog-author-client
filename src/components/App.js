import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div>
      <Outlet context={[user, setUser]} />
    </div>
  );
}

export default App;
