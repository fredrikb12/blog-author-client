import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

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
        method: "POST",
        mode: "cors",
        body: body,
      });
      const res = await response.json();
      if (res.code === 200) {
        nav("/success");
      } else {
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
