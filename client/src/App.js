import { useEffect } from "react";
import Sign from "./components/Signin";

function App() {
  useEffect(() => {
    const getAllUsers = async () => {
      fetchToken();
      setTimeout(() => {
        fetchAllUsers();
      }, 300);
    };
    getAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    const response = await fetch("/users", {
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    return data;
  };

  const fetchToken = async () => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email: "jorge2@test.com", password: "testpass" }),
    });
    const data = await response.json();
    return data;
  };

  return <Sign />;
}

export default App;
