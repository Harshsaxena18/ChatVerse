import { useState } from "react";
import axios from "axios";

import LoginForm from  './LoginForm';



const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectToLogin, setRedirectToLogin] = useState(false);
 

  const handleRegister = async (e) => {
    e.preventDefault();

    const authObject = {
      "Private-Key": "23a02dc3-79ed-4678-8548-4c7518ce193e", 
    };

    try {
      // Create a new user in Chat Engine
      await axios.post(
        `https://api.chatengine.io/projects/people/`,
        {
          username: username,
          secret: password,
          firstname: firstname,
        },
        { headers: authObject }
      );
      await axios.patch(
        `https://api.chatengine.io/users/me/`,
        {
          first_name: firstname,
        },
        { headers: authObject }
      );

      setUsername("");
      setPassword("");
      setError("");

      // Navigate to the login page
      setRedirectToLogin(true);
      
      

    } catch (error) {
      setError("This Username exists. Please try again.");
    }
  };
  if (redirectToLogin) {
    return <LoginForm />;
  }
  const handleRedirectToLogin = () => {
    setRedirectToLogin(true);
  };




  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Register</h1>
        <form onSubmit={handleRegister}>
        <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className="input"
            placeholder="Your Name"
            required
          />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Register</span>
            </button>
            <p style={{marginTop:'auto',fontSize:30}}>
              <span className="login-link" onClick={handleRedirectToLogin} >
                <u>Already have an account? Login here</u>
              </span>
              </p>
            
          </div>
        </form>
            
        <h1 className="error">{error}</h1>
    
      </div>
    </div>
  );
};

export default RegisterForm;