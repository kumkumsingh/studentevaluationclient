import React,{useState} from 'react'
import { useForm } from 'react-hook-form'
import AuthService from "../../service/AuthService"
import "./Login.css"
import { Link } from 'react-router-dom'

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const [ errorMessage, setErrorMessage ] = useState('');
  const onSubmit = (data) => {
    setErrorMessage(null)
    const service = new AuthService();
    service
      .login(data.userName, data.password)
      .then((resp) => {
        props.history.push("/profile")
      })
      .catch((e) => {
        console.log("error message", e.response.data.message )
        setErrorMessage(e.response.data.message)});
  }
  const handleOnChange = () => {
    setErrorMessage(null)
  }
  return (
    <div className="main-container">
      <div className="login-container">
        <form className="login-form-container login-form-size" onSubmit={handleSubmit(onSubmit)}>
          <div className="login-text">Log in</div>
          <hr className="hr"></hr>
          <button className="submit-bt">Sign in with Google</button>
          <hr className="hr"></hr>
          <input
            className="input form-item"
            type="text"
            placeholder="User Name"
            name="userName"
            onChange={handleOnChange}
            ref={register({ 
              required: "* Username Required" }
          )}
          ></input>
          <input
            className="input password form-item"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
            ref={register({
              required: "* Password Required"
            })}
          ></input>
          {errors.userName && <p>{errors.userName.message}</p>}
          {errors.password && <p>{errors.password.message}</p>}
          {errorMessage && <div className="error-msg">* {errorMessage}</div>}
          <input className="submit-bt" type="submit" value="Log in"></input>
          <p className="text-blue">No account yet !!! <Link className="button" to={`/signup`}>Sign up</Link></p>
        </form>
      </div>
    </div>
  );
}
