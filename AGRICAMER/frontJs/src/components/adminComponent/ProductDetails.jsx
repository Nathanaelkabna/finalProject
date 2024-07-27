/* eslint-disable react-hooks/exhaustive-deps */
import axiosClient from "../../axios";

import { useEffect, useRef, useState} from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router";
export default function CreateProduct() {
  const {id} = useParams()
  const { user } = useStateContext();
  const productNameRef = useRef();
  const descriptionRef = useRef();
  const pricePerUnitRef = useRef();
  const categoryRef = useRef();
  const quantityRef = useRef();
  const imageRef = useRef();
  const [errors, setErrors] = useState({ __html: "" });
  // // eslint-disable-next-line no-unused-vars
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState([]);
  const formData = new FormData();
  const navigate = useNavigate()



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
       .then(({data}) => {
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
    };
    fetchData();
  }, []);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const onSubmit = (e) => {
    e.preventDefault()
    setErrors({ __html: "" });
    formData.append("_method", "PUT");
    formData.append("image", product.image  && !previewImage ? product.image : selectedImage);
    formData.append("product_name", productNameRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("category_id", categoryRef.current.value);
    formData.append("farmer_id", user.id);
    formData.append("quantity", quantityRef.current.value);
    formData.append("price_per_unit", pricePerUnitRef.current.value);
    // console.log(formData)
    axiosClient
      .post(`products/${id}`, formData, { headers: "multipart/form-data" })
      .then(() => {
        navigate(location?.state?.from || '/admin/products', {replace: true})
        setPreviewImage(null);
        setSelectedImage(null);
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
      <form action="" method="post" onSubmit={onSubmit}>
        {errors.__html && (
          <div
            className="alert alert-danger"
            dangerouslySetInnerHTML={errors}
          ></div>
        )}
        <div className="row">
          <h2 className="text-center">modifier un nouveau produit</h2>
          <div className="col-4 text-dark d-flex flex-column">
            <div>
              <label htmlFor="">selectionner une image</label>

              {product.image && !previewImage ?  (
                <img
                src={`http://127.0.0.1:8000/storage/${product.image}`}
                  alt="selected image"
                  style={{ maxWidth: "100%", maxHeight:"100%", flex:"1", borderRadius:"5px" }}
                />
              ): (
                <img
                  src={previewImage}
                  alt="selected image"
                  style={{ maxWidth: "100%", maxHeight:"100%", flex:"1", borderRadius:"5px" }}
                />
              )}
            </div>
            <input
              className="form-control"
              type="file"
              name="image"
              ref={imageRef}
              onChange={onFileChange}
            />
          </div>
          <div className="col-8">
            <div className="row">
            <div className="form-group col-6">
              <label htmlFor="product_name">nom du produit</label>
              <input
                type="text"
                className="form-control"
                name="product_name"
                ref={productNameRef}
                id="product_name"
                defaultValue={product.product_name}
              />
            </div>
            <div className="form-group col-6">
              <label htmlFor="quantity">quantités</label>
              <input
                type="number"
                className="form-control"
                name="quantity"
                ref={quantityRef}
                id="quantity"
                defaultValue={product.quantity}
              />
            </div>
            </div>

            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="price_per_unit">prix unitaire</label>
                <input
                  type="number"
                  className="form-control"
                  name="price_per_unit"
                  ref={pricePerUnitRef}
                  id="price_per_unit"
                  defaultValue={product.price_per_unit}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="category">categorie</label>
                <select
                  name="category_id"
                  className="form-select"
                  ref={categoryRef}
                  id="category"
                >
                  {
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id} selected={product.category_id === cat.id ? "selected" : ""}>{cat.name}</option>
                    ))
                  }
                  
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">description</label>
              <textarea
                type="text"
                className="form-control"
                name="description"
                ref={descriptionRef}
                id="description"
                defaultValue={product.description}
                cols="10"
                rows="5"
              ></textarea>
            </div>
            <div className="form-group my-2">
              <button
                type="submit"
                className="btn btn-block btn-lg btn-success w-100 text-black"
              >
                modifier
              </button>
            </div>
          </div>
        </div>
      </form>
    </>

  );
}
