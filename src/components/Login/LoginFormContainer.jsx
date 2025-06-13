import LoginForm from "./LoginForm";
import { handleLogin } from "../../services/login";

function LoginFormContainer() {
    return   <LoginForm login = {handleLogin}/>
}

export default LoginFormContainer


// {
//     "username": "derek",
//     "password": jklg*_56
// }