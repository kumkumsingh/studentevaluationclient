import React from 'react'
import { useForm } from 'react-hook-form'
import AuthService from "../../service/AuthService";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //    console.log("data :", data)
    const service = new AuthService();
    service
      .login(data.userName, data.password)
      .then((resp) => props.history.push("/profile"))
      .catch((e) => console.log(e));
  };
  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input"
          type="text"
          placeholder="User Name"
          name="userName"
          ref={register({ 
            required: "USER NAME REQUIRED" }
         )}
        ></input>
        <input
          className="input password"
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: "PASSWORD REQUIRED"
          })}
        ></input>
        {errors.userName && <p>{errors.userName.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        <input className="input submit-bt" type="submit"></input>
      </form>
    </div>
  );
}
