/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Admin() {
    const { user } = useStateContext();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({ __html: "" });
    useEffect(() => {
        setTimeout(() => {
            fetchProducts();
        }, 1);
        const fetchProducts = () => {
            setErrors({ __html: "" });
            axiosClient
                .get(`/getProducts/${user.id}`)
                .then(({ data }) => {
                    setProducts(data.product);
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

            axiosClient.get(`/categories`).then(({ data }) => {
                setCategories(data.category.data);
            });
        };
    }, [user.id]);
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="col-xxl-4 col-xl-12">
                        <div className="card info-card customers-card">
                            <div className="card-body">
                                <h5 className="card-title">Total produits</h5>

                                <div className="d-flex align-items-center">
                                    <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                    </div>
                                    <div className="">
                                        <h6>{products && products.length}</h6>
                                        <Link
                                            to="/admin/products"
                                            className="small"
                                        >
                                            aller vers vos produits
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-12">
                        <div className="card info-card customers-card">
                            <div className="card-body d-flex justify-content-end">
                                <h5 className="card-title">category</h5>

                                <div className="d-flex align-items-center">
                                    <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                    </div>
                                    <div className="">
                                        <h6>
                                            {categories.length}
                                        </h6>
                                        <Link to="#" className="small">
                                            aller vers nos categories
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xxl-4 col-xl-12">
                        <div className="card info-card customers-card">
                            <div className="card-body">
                                <h5 className="card-title">produits vendus</h5>

                                <div className="d-flex align-items-center">
                                    <div className="mx-3 card-icon rounded-circle d-flex align-items-center justify-content-center">
                                        <i className="bi bi-cart"></i>
                                    </div>
                                    <div className="">
                                        {/* <h6>{products.filter(product => product.status != 0).length}</h6> */}
                                        <a href="#" className="small">
                                            historique des ventes
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
