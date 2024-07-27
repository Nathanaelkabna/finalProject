import { Link } from "react-router-dom";
import styles from "../css/guestLayout.module.css";
import { useRef, useState } from "react";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({__html: ''})
  const { setUser, setToken } = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setErrors({ __html: finalErrors.join("<br>") });
        }
      });

  };

  return (
    <>
      <div className={styles.banner}>
        <h2>Connexion</h2>
        <form action="" method="post" onSubmit={onSubmit}>
          {errors.__html && (
            <div className="alert alert-danger" dangerouslySetInnerHTML={errors}></div>
          )}
          <div className="form-group mb-5 mt-4">
            <input
              ref={emailRef}
              className="form-control py-4"
              type="email"
              name="email"
              placeholder="adresse e-mail"
            />
          </div>
          <div className="form-group">
            <input
              ref={passwordRef}
              className="form-control py-4"
              type="password"
              name="password"
              placeholder="Mot de passe"
            />
          </div>

          {/* <div className="my-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="remember"
                value={remember}
                onChange={(e) => onChecked(e)}
              />
              <label className="form-check-label" htmlFor="">
                se souvenir de moi
              </label>
            </div>
          </div> */}

          <div className="form-group w-100 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-block btn-success py-3 w-100 text-black"
            >
              se connecter
              <i>
                <img src="images/icons/34.svg" alt="" width="4%" />
              </i>
            </button>
          </div>
          <div className="d-flex justify-content-center my-3">
            <p>
              pas de compte ?{" "}
              <Link to="/admin/signup" className="text-success text-decoration-none">
                inscrivez vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
