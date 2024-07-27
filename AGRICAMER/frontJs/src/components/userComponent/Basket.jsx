import { useEffect, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { Link, useNavigate } from "react-router-dom";

export default function Basket() {
    const { user } = useStateContext();
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState({ __html: "" });
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const formData = new FormData();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchProducts = () => {
            setErrors({ __html: "" });
            axiosClient
                .get(`/orders/${user.id}`)
                .then(({ data }) => {
                    setOrders(data.order);
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
                .get(`/products`)
                .then(({ data }) => {
                    setProducts(data.product.data);
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
        fetchProducts();
    }, [user.id]);

    const deleteCart = (e) => {
        e.preventDefault();

        setErrors({ __html: "" });
        axiosClient
            .delete(`/orders/${user.id}`)
            .then(() => {
                navigate(0);
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

    const facture = (e, userId, orders) => {
        const addToCart = setTimeout(() => {
            e.preventDefault();
            const total = orders.reduce((accumlator, tab) => {
                return accumlator + tab.price_per_unit * tab.quantity;
            }, 0);
            formData.append("user_id", userId);
            formData.append("total_price", total);

            console.log(formData);
            axiosClient
                .post(`/order`, formData)
                .then(({ data }) => {
                    setMessage(data.message);
                    setProducts(null)
                    setOrders(null)
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
            <div className="card-body">
                {message && (
                    <div
                        className="alert alert-dismissible fade show"
                        role="alert"
                        style={{ background: "#D1E7DD" }}
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

                <Link to="/nos-produits" className="btn btn-outline-primary">
                    retour au marché
                </Link>
                <h1 className="">
                    panier de Mr/Mme{" "}
                    <b className="text-danger">
                        <i>{user.name}</i>
                    </b>
                </h1>
                <ol className="list-group list-group-numbered">
                    <table className="table datatable datatable-table">
                        <thead>
                            <tr>
                                <th
                                    style={{
                                        width: " 20.926243567753%",
                                    }}
                                >
                                    Nom du produit
                                </th>
                                <th
                                    style={{
                                        width: "22.46998284734134%",
                                    }}
                                >
                                    prix_unitaire
                                </th>
                                <th
                                    style={{
                                        width: "22.46998284734134%",
                                    }}
                                >
                                    quantités
                                </th>
                                <th
                                    style={{
                                        width: "22.46998284734134%",
                                    }}
                                >
                                    total
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.map((prod) =>
                                orders && orders.map((ord) =>
                                    prod.id == ord.product_id ? (
                                        <tr key={ord.id}>
                                            <td>{prod.product_name}</td>
                                            <td>
                                                {prod.price_per_unit} {""}{" "}
                                                {prod.unit}
                                            </td>
                                            <td>{ord.quantity}</td>
                                            <td>
                                                {ord.quantity *
                                                    prod.price_per_unit}
                                            </td>
                                        </tr>
                                    ) : (
                                        ""
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                    <div className="fs-3 d-flex justify-content-evenly">
                        <span>
                            <b>Montant Total : </b>
                        </span>
                        <span>
                            <b>
                                {orders && orders.reduce((accumlator, tab) => {
                                    return (
                                        accumlator +
                                        tab.price_per_unit * tab.quantity
                                    );
                                }, 0)}{" "}
                                XAF
                            </b>
                        </span>
                    </div>
                </ol>
                <div className="card-footer">
                    <button
                        type="button"
                        className="btn btn-success py-2 mx-2"
                        onClick={(e) => facture(e, user.id, orders)}
                    >
                        confirmer l&apos;achat
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger py-2 mx-2"
                        onClick={(e) => deleteCart(e)}
                    >
                        vider le panier
                    </button>
                </div>
            </div>
        </div>
    );
}
