import axiosClient from "../../axios";

import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate , useLocation} from "react-router";
export default function CreateProduct() {
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
    const formData = new FormData();
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        const fetchCategories = () => {
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
        };
        fetchCategories();
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
        formData.append("image", selectedImage);
        formData.append("product_name", productNameRef.current.value);
        formData.append("description", descriptionRef.current.value);
        formData.append("category_id", categoryRef.current.value);
        formData.append("farmer_id", user.id);
        formData.append("price_per_unit", pricePerUnitRef.current.value);
        formData.append("quantity", quantityRef.current.value);

        axiosClient
            .post("/products", formData, { headers: "multipart/form-data" })
            .then(() => {
              navigate(location?.state?.from || '/admin/products', {replace: true})
                setPreviewImage(null);
                setSelectedImage(null);
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
                    <h2 className="text-center">ajouter un nouveau produit</h2>
                    <div className="col-4 text-dark d-flex flex-column">
                        <div>
                            <label htmlFor="">selectionner une image</label>

                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="selected image"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        flex: "1",
                                        borderRadius: "5px",
                                    }}
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
                            <div className="form-group col-6 ">
                                <label htmlFor="product_name">
                                    nom du produit
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="product_name"
                                    ref={productNameRef}
                                    id="product_name"
                                />
                            </div>
                            <div className="form-group col-6 ">
                                <label htmlFor="quantity">
                                    quantités
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="quantity"
                                    ref={quantityRef}
                                    id="quantity"
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-6 form-group">
                                <label htmlFor="price_per_unit">
                                    prix unitaire
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="price_per_unit"
                                    ref={pricePerUnitRef}
                                    id="price_per_unit"
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
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
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
                                cols="10"
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="form-group my-2">
                            <button
                                type="submit"
                                className="btn btn-block btn-lg btn-success w-100 text-black"
                            >
                                ajouter
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
        // <>
        //   <div className={styles.banner}>
        //     <h2>Inscription</h2>
        // <form
        //   action=""
        //   method="post"
        //   onSubmit={onSubmit}
        // >
        // {errors.__html && (
        //   <div
        //     className="alert alert-danger"
        //     dangerouslySetInnerHTML={errors}
        //   ></div>
        // )}
        //       <div className="row">
        //         <div className="col-8">
        //           <div className="form-group my-3">
        //             <input
        //               ref={productNameRef}
        //               className="form-control py-3"
        //               type="text"
        //               name="name"
        //               placeholder="Nom du produit"
        //             />
        //           </div>
        //           <div className="form-group my-3">
        //             <textarea
        //               ref={descriptionRef}
        //               className="form-control py-3"
        //               name="description"
        //               placeholder="description"
        //             >

        //             </textarea>
        //           </div>
        //           <div className="row mb-3">
        //             <div className="form-group col-6">
        //               <input
        //                 ref={pricePerUnit}
        //                 className="form-control py-3"
        //                 type="number"
        //                 name="price_per_unit"
        //               />
        //             </div>
        //           </div>
        //         </div>
        //         <div className="col-4 my-3">
        //           <div className="rounded-1" style={{width:"200px", border:"1px solid black", borderRadius:"5px"}} >
        //             {previewImage && <img src={previewImage} alt="selected image" style={{width:"200px", border:"1px solid black", borderRadius:"5px"}} /> }
        //           </div>
        //           <input className="form-control" type="file"  name="image" ref={imageRef} onChange={onFileChange} />
        //         </div>
        //       </div>

        //       <div className="form-group w-100 d-flex justify-content-center">
        //         <button
        //           type="submit"
        //           className=""
        //         >
        //           ajouter
        //         </button>
        //       </div>
        //     </form>
        //   </div>
        // </>
    );
}
