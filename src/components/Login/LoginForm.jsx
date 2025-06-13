import { useState } from "react";
import { handleLogin } from "../../services/login";
import { useAuth } from "../../context/AuthContext";
import "./LoginForm.css";
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await handleLogin(username, password);
      if (data?.token) {
        login({ token: data.token, username });
        navigate('/');
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="login-container">
      {isLoading ? (<div>isLoading ....</div>) :
     ( <><h2>Prijavi se</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Korisničko ime:</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Lozinka:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={isLoading}>Prijava</button>
      </form>
      </>) }
    </div>
  );
}

export default LoginForm;
