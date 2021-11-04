import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignIn() {
    const {register, handleSubmit} = useForm();
    const {singInTrue} = useContext(AuthContext);

    async function handleloginSubmit (data) {
        try {
            const loginResult= await axios.post("http://localhost:3000/login", {
                email: data.emailadres,
                password: data.password,
            });
            console.log(loginResult);
            singInTrue(loginResult.data.accessToken);
        }catch (e) {
            console.error(e)
        }
        console.log("form is sumitted");
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form onSubmit={handleSubmit(handleloginSubmit)}>
      <label htmlFor="emailadres">
          Email-adres:
          <input
              type="text"
              id="emailadres"
              {...register("emailadres")}
          />
      </label>
      <label htmlFor="wachtwoord">
          Wachtwoord:
          <input
              type="password"
              id="wachtwoord"
              {...register("password")}
          />
      </label>
        <button type="submit">
            Inloggen
        </button>
      </form>

      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;