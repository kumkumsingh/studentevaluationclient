import React from "react";
import AuthService from "../../service/AuthService";
import { useForm } from "react-hook-form";
import "./Signup.css"
import { Link } from "react-router-dom";

export default function Signup(props) {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    //    console.log("data :", data)
    const service = new AuthService();
    service
      .signup(data.userName, data.email, data.password)
      .then((resp) => props.history.push("/login"))
      .catch((e) => console.log(e));
  };
  return (
    <div className="signup-container">
      <form className="signup-form-container signup-form-size" onSubmit={handleSubmit(onSubmit)}>
        <div className="signup-text">Signup</div>
        <input
          className="input"
          type="text"
          placeholder="User Name"
          name="userName"
          ref={register({ 
            required: "USER NAME IS REQUIRED" }
         )}
        ></input>
        <input
          className="input password"
          type="password"
          name="password"
          placeholder="Password"
          ref={register({
            required: "PASSWORD REQUIRED",
            minLength: { value: 8, message: "TOO SHORT" },
          })}
        ></input>
        <input
          className="input"
          type="text"
          name="email"
          placeholder="email address"
          ref={register({ required: "EMAIL REQUIRED" })}
        ></input>
        {errors.userName && <p>{errors.userName.message}</p>}
        {errors.email && <p>{errors.email.message}</p>}
        {errors.password && <p>{errors.password.message}</p>}
        <input className="submit-bt" type="submit" value="Sign up"></input>
        <p className="text-blue">Already have an account !!! <Link className="button" to={`/login`}>Log in</Link></p>
      </form>
    </div>
  );
}
