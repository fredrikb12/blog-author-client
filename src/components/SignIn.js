import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function SignIn() {
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [user, setUser] = useOutletContext();

  const nav = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPw(() => e.target.value);
    } else if (e.target.name === "username") {
      setEmail(() => e.target.value);
    }
  };

  async function LogIn(e) {
    e.preventDefault();

    const body = JSON.stringify({
      username: email,
      password: pw,
    });

    try {
      const response = await fetch("http://localhost:3000/auth/signin", {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        mode: "cors",
        body: body,
      });
      
      if (!response.ok) return Promise.reject(response.status);

      const res = await response.json();
      if (res.code === 200) {
        await setUser(() => res.user);
        nav("/success");
      } else {
        setUser(() => null);
        setErrors(() => res.errors);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form method="POST" onSubmit={LogIn}>
      <div>
        <label htmlFor="username">
          Email:
          <input
            id="username"
            type="email"
            name="username"
            value={email}
            placeholder="email@gmail.com"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            name="password"
            value={pw}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </div>
      {errors.map((error, index) => {
        return (
          <p style={{ color: "red" }} key={index}>
            {error}
          </p>
        );
      })}
    </form>
  );
}

export default SignIn;
