import { Link } from "react-router-dom";
import styles from "../css/guestLayout.module.css";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

import { useRef, useState } from "react";
export default function SignUp() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const addressRef = useRef();
  const phoneNumberRef = useRef();
  const imageRef = useRef();
  const [role, setRole] = useState(false)
  const { setUser, setToken } = useStateContext();
  const [errors, setErrors] = useState({ __html: "" });
  // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] =useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const formData = new FormData();


  const onFileChange = (e) => {
    const file = e.target.files[0]
    setSelectedImage(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleChange = (e) => {
    console.log(e.target.checked)
    setRole(e.target.checked)
  }



  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({ __html: "" });
    formData.append('image', selectedImage)
    formData.append('name', nameRef.current.value)
    formData.append('email', emailRef.current.value)
    formData.append('password', passwordRef.current.value)
    formData.append('password_confirmation', passwordConfirmationRef.current.value)
    formData.append('address', addressRef.current.value)
    formData.append('phone_number', phoneNumberRef.current.value)
    formData.append('role', role)

    console.log(formData)

    axiosClient
      .post("/signup",formData, { headers: 'multipart/form-data' })
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        setPreviewImage(null)
        setSelectedImage(null)
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
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.banner}>
        <h2>Inscription</h2>
        <form
          action=""
          method="post"
          onSubmit={onSubmit}
        >
          {errors.__html && (
            <div
              className="alert alert-danger"
              dangerouslySetInnerHTML={errors}
            ></div>
          )}
          <div className="row">
            <div className="col-8">
              <div className="form-group my-3">
                <input
                  ref={nameRef}
                  className="form-control py-3"
                  type="text"
                  name="name"
                  placeholder="Nom complet"
                />
              </div>
              <div className="form-group my-3">
                <input
                  ref={emailRef}
                  className="form-control py-3"
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="row mb-3">
                <div className="form-group col-6">
                  <input
                    ref={passwordRef}
                    className="form-control py-3"
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                  />
                </div>
                <div className="form-group col-6">
                  <input
                    ref={passwordConfirmationRef}
                    className="form-control py-3"
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirmation du mot de passe"
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="form-group col-7">
                  <input
                    ref={addressRef}
                    className="form-control py-3"
                    type="text"
                    name="address"
                    placeholder="Adresse"
                  />
                </div>
                <div className="form-group col-5">
                  <input
                    ref={phoneNumberRef}
                    className="form-control py-3"
                    type="number"
                    name="phone_number"
                    placeholder="Numero de telephone"
                  />
                </div>
              </div>
            </div>
            <div className="col-4 my-3">
              <div className="">
                {previewImage && <img src={previewImage} alt="selected image" style={{width:"200px"}} /> }
              </div>
              <input className="form-control" type="file"  name="image" ref={imageRef} onChange={onFileChange} />
              <div className="form-group my-3">
                <label htmlFor="" className="form-check-label">s&apos;inscrire en tant que agricuteur</label>
                
                <div className="d-flex form-switch">
                <input type="checkbox" name="role" id="" className="form-check-input" onChange={(e) => handleChange(e)} />
                </div>
               
                
              </div>
            </div>
          </div>

          <div className="form-group w-100 d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-block btn-success py-3 w-100 text-black"
            >
              s&apos;inscrire
            </button>
          </div>
          <div className="d-flex justify-content-center my-3">
            <p>
              deja membre ?{" "}
              <Link
                to="/admin/login"
                className="text-success text-decoration-none"
              >
                connectez vous
              </Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
