import React from 'react';
import axios from "axios";
import {Link, useHistory} from 'react-router-dom';
import {useForm} from "react-hook-form"

function SignUp() {
    const {register, handleSubmit} = useForm();
    const history = useHistory();

    async function onFormSubmit(data) {
        try {
           const resultSubmit = await axios.post("http://localhost:3000/register", {
               email: data.emailadres,
               password: data.password,
               username: data.username,
           });
            console.log(resultSubmit);

        }catch (e) {
            console.error(e);
        }
        console.log(data);
        history.push("/signin");
    }

  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?
      </p>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="gebruikersnaam">
            Gebruikersnaam:
            <input
                type="text"
                id="gebruikersnaam"
                {...register("username")}
            />
        </label>
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
              Registreer
          </button>
      </form>

      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;