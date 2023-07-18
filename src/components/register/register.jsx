import {useState,useEffect,useRef} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck,faTimes} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axiosClient from '../../api/axiosConfig.js';
import './register.css';
const Register = () => {
    const nameRef = useRef();
    const [name,setName] = useState("");
    const [validName,setValidName] = useState(false);
    const [user,setUser] = useState("");
    const [validUserName,setValidUserName] = useState(false);
    const [password,setPassword] = useState("");
    const [validPassword,setValidPassword] = useState(false);
    const [matchPassword,setMatchPassword] = useState("");
    const [validMatch,setValidMatch] = useState(false);
    const [submitSuccess,setSubmitSuccess] = useState("");
    const NAME_REGEX = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
    const USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
    const PASSWORD_REGX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    useEffect(() => {
      nameRef.current.focus();
    },[]);
    useEffect(() => {
      const result = NAME_REGEX.test(name);
      setValidName(result);
    },[name,NAME_REGEX]);
    useEffect(() => {
      const result = USER_REGEX.test(user);
      setValidUserName(result);
    },[user,USER_REGEX]);
    useEffect(() => {
      const result = PASSWORD_REGX.test(password);
      setValidPassword(result);
      const match = password === matchPassword;
      setValidMatch(match);
    },[password,matchPassword,PASSWORD_REGX]);
    const postData = async (event) => {
      event.preventDefault();
      try {
        const userRegularExpression = {
          name: event.target.name.value,
          userName: event.target.username.value,
          roles: 'ROLE_USER',
          password: event.target.password.value,
        };
        const response = await axiosClient.post('/api/v1/auth/register',userRegularExpression);
        setSubmitSuccess('You Have Registered Successfully',response);
      }catch(error){
        setSubmitSuccess('You Have Not Registered Successfully',error);
      }
    };
    return (
      <Container>
        <header>
          <h4>Register</h4>
        </header>
        <main className="register-container">
          <div className="register-layout">
            <Form onSubmit={postData}>
              <Form.Group className="mb-2" controlId="formBasicName">
                <Form.Label>
                  Name:
                  <span className={validName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validName || !name ? 'hide' : 'valid'}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  id="name"
                  ref={nameRef}
                  autoComplete="off"
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicUserName">
                <Form.Label>
                  Username:
                  <span className={validUserName ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validUserName || !user ? 'hide' : 'valid'}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  id="username"
                  autoComplete="off"
                  onChange={(event) => setUser(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>
                  Password:
                  <span className={validPassword ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validPassword || !password ? 'hide' : 'valid'}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  id="password"
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicConfirmPassword">
                <Form.Label>
                  Confirm Password:
                  <span className={validMatch && matchPassword ? 'valid' : 'hide'}>
                    <FontAwesomeIcon icon={faCheck} className="valid-icon" />
                  </span>
                  <span className={validMatch || !matchPassword ? 'hide' : 'valid'}>
                    <FontAwesomeIcon icon={faTimes} className="invalid-icon" />
                  </span>
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  id="confirm_Password"
                  autoComplete="off"
                  onChange={(event) => setMatchPassword(event.target.value)}
                  required
                />
              </Form.Group>
              <Button
                disabled={
                  !validName || !validUserName || !validPassword || !validMatch
                    ? true
                    : false
                }
                variant="info"
                type="submit"
              >
                Submit
              </Button>
            </Form>
            {submitSuccess ? (
              <section className="register-message">{submitSuccess}</section>
            ) : null}
          </div>
        </main>
      </Container>
    );
};
export default Register;