/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import axiosClient from "../../axios";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

export default function UnProduit() {
  const { id } = useParams();
  const { user } = useStateContext();
  const [errors, setErrors] = useState({ __html: "" });
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const [singleUser, setSingleUser] = useState([]);
  const [message, setMessage] = useState("");
  const quantityRef = useRef();
  const formData = new FormData();
  useEffect(() => {
    const fetchData = () => {
      setErrors({ __html: "" });
      axiosClient
        .get(`/categories`)
        .then(({ data }) => {
          setCategories(data.category.data);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(
              error.response.data.errors
            ).reduce((accum, next) => [...accum, ...next], []);
            console.log(finalErrors);
            setErrors({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });

      axiosClient
        .get(`/products/${id}`)
        .then(({ data }) => {
          setProduct(data.product);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(
              error.response.data.errors
            ).reduce((accum, next) => [...accum, ...next], []);
            console.log(finalErrors);
            setErrors({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });

      axiosClient
        .get(`/users`)
        .then(({ data }) => {
          setSingleUser(data.users);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(
              error.response.data.errors
            ).reduce((accum, next) => [...accum, ...next], []);
            console.log(finalErrors);
            setErrors({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });
        
    };
    fetchData();
    
  }, [product]);

  const handleUpdate = (e, prodId, price, userId) => {
    const addToCart = setTimeout(() => {
      e.preventDefault();
      console.log({ prodId, price, userId });
      formData.append("price_per_unit", price);
      formData.append("user_id", userId);
      formData.append("product_id", prodId);
      formData.append("quantity", quantityRef.current.value)
      axiosClient
        .post(`/orders`, formData)
        .then(({ data }) => {
          console.log(data.message);
          setMessage(data.message);
        })
        .catch((error) => {
          if (error.response) {
            const finalErrors = Object.values(
              error.response.data.errors
            ).reduce((accum, next) => [...accum, ...next], []);
            console.log(finalErrors);
            setErrors({ __html: finalErrors.join("<br>") });
          }
          console.error(error);
        });
    }, 100);
    return () => {
      clearTimeout(addToCart);
    };
  };
  return (
    <div className="container my-3">
      {message && (
        <div
          className="alert alert-dismissible fade show"
          role="alert"
          style={{background:"#D1E7DD"}}
        >
          {message}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      <div className="row">
        <div className="col-lg-8 rounded-3">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${product.image}`}
            width="600"
            className=""
            alt=""
          />

          <form action="forms/contact.php" method="post" className="mt-2">
            <h1 className="text-cyan">contacter le producteur</h1>
            <div className="row gy-4">
              <div className="col-md-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="votre nom"
                  required=""
                />
              </div>

              <div className="col-md-6 ">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="adresse email"
                  required=""
                />
              </div>

              <div className="col-12">
                <input
                  type="text"
                  className="form-control"
                  name="subject"
                  placeholder="sujets"
                  required=""
                />
              </div>

              <div className="col-12">
                <textarea
                  className="form-control"
                  name="message"
                  rows="6"
                  placeholder="Message"
                  required=""
                ></textarea>
              </div>

              <div className="col-12 text-center">
                <button type="submit" className="btn btn-success">
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="card">
            <div className="card-header">
              <h4>{product.product_name}</h4>
              <h4>restant : {product.quantity} </h4>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                <li>
                  <span className="text-red">Categories: </span>
                  <span>
                    {categories.map((category) =>
                      product.category_id == category.id ? category.name : ""
                    )}
                  </span>
                </li>
                <hr />
                <li>
                  <span className="text-red">prix: </span>{" "}
                  <span>
                    {product.price_per_unit} - {product.unit}
                  </span>
                </li>
                <hr />
                <li>
                  <span className="text-red">description: </span>{" "}
                  <span>{product.description}</span>
                </li>
                <hr />
                <li>
                  <span className="text-red">producteur: </span>{" "}
                  <span>
                    {singleUser.map((use) =>
                      use.id == product.farmer_id ? (
                        <span key={use.id}>{use.name}</span>
                      ) : (
                        ""
                      )
                    )}
                  </span>
                </li>
                <hr />
                <li>
                  <span className="text-red">quantités: </span>{" "}
                  <input type="number" ref={quantityRef} name="quantity" id=""  className="form-control"/>
                </li>
              </ul>
            </div>
            <div className="d-flex flex-column justify-content-center my-2">
              <button
                type="button"
                className="btn btn-success m-1"
                onClick={(e) =>
                  handleUpdate(e, product.id, product.price_per_unit, user.id)
                }
              >
                <i className="bi-shop mr-2"></i>
                ajouter au panier
              </button>
              <Link to="/nos-produits" className="btn btn-info m-1">
                <i className="bi-arrow-left mr-2"></i>
                revenir sur ma page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
