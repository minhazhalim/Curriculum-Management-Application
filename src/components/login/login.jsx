import {useState,useEffect,useRef} from 'react';
import {useNavigate,useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../../hooks/useAuth.js';
import axiosClient from '../../api/axiosConfig.js';
import './login.css';
const Login = () => {
  const navigate = useNavigate();
  const userRef = useRef();
  const location = useLocation();
  const [user,setUser] = useState();
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");
  const {setAuth} = useAuth();
  const from = location.state?.from?.pathname || '/';
  useEffect(() => {
      userRef.current.focus();
  },[]);
    const postLogin = async (event) => {
      event.preventDefault();
      const userName = event.target.username.value;
      const password = event.target.password.value;
      try {
        const base64Encode = btoa(`${userName}:${password}`);
        const config = {
            headers: {Authorization: `Basic ${base64Encode}`}
        };
        const response = await axiosClient.get('/api/v1/auth/me',config);
        const data = response.data;
        if(response?.status === 200){
            setErrorMessage("");
            setAuth({user: data,password: password});
            navigate(from,{replace: true});
        }else{
            setErrorMessage('You Were Unable to Login into the System');
        }
      }catch(error){
            setErrorMessage('Something Went Wrong ' + error);
      }
    };
    return (
       <Container>
         <header>
           <h4>Login</h4>
         </header>
         <main className="login-container">
           <div className="login-layout">
             <Form onSubmit={postLogin}>
               <Form.Group className="mb-3">
                 <Form.Label>Username:</Form.Label>
                 <Form.Control
                   type="text"
                   placeholder="Enter Username"
                   id="username"
                   ref={userRef}
                   autoComplete="off"
                   onChange={(event) => setUser(event.target.value)}
                   required
                   value={user}
                 />
               </Form.Group>
               <Form.Group className="mb-3">
                 <Form.Label>Password:</Form.Label>
                 <Form.Control
                   type="password"
                   placeholder="Password"
                   id="password"
                   autoComplete="off"
                   onChange={(event) => setPassword(event.target.value)}
                   value={password}
                   required
                 />
               </Form.Group>
               <Button variant="info" type="submit">
                 Submit
               </Button>
             </Form>
             {errorMessage ? (
               <div className="login-error-message">
                 <p>{errorMessage}</p>
               </div>
             ) : null}
           </div>
         </main>
       </Container>
    );
};
export default Login;