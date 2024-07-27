/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Products() {
  const { user } = useStateContext();
  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({ __html: "" });
  const [itemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [realId, setRealId] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      fetchProducts(currentPage);
      setIsLoading(true)
    }, 1)
    const fetchProducts = (pageNumber) => {
      setErrors({ __html: "" });
      axiosClient
        .get(
          `/paginateProducts/${user.id}?page=${pageNumber}&itemsPerPage=${itemsPerPage}`
        )
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
        })
    };

  }, [currentPage, user.id, isLoading]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const seeProduct = (id) => {
    navigate(`/admin/products/${id}`, { state: { from: location.pathname}});
    // navigate(`/admin/products/${id}`);
  };

  const deleteItem = (e, id) => {
    e.preventDefault();
    setErrors({ __html: "" });
    axiosClient
      .delete(`/products/${id}`)
      .then(() => {
        navigate(location?.state?.from || '/admin/products', {replace: true})
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
      })
      .finally(() => {
        setIsLoading(false);
      })

  };


  const storeLocation = () => {
    navigate('/admin/createProduct', { state: { from: location.pathname}});
  }
  const handleRealId = (id, name) => {
    setRealId({ id: id, name: name });
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="card recent-sales overflow-auto">
            <div className="filter">
              <a className="icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-three-dots"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                <li className="dropdown-header text-start">
                  <h6>Filter by</h6>
                </li>

                <li>
                  <a className="dropdown-item" href="#">
                    a-z
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    prices
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    latest product
                  </a>
                </li>
              </ul>
            </div>

            <div className="card-body">
              <Link
                className="btn btn-outline-success"
                type="button"
                onClick={storeLocation}
              >
                Ajouter un nouveau produit
              </Link>
                {
                  products.data?.length > 0 ? <>
                  <table className="table table-borderless datatable text-center align-content-center">
                    <thead>
                      <tr>
                        <th scope="col">id</th>
                        <th scope="col">image</th>
                        <th scope="col">nom</th>
                        <th scope="col">description</th>
                        <th scope="col">prix</th>
                        <th scope="col">quantités</th>
                        <th scope="col">Statut</th>
                        <th scope="col">Modifier</th>
                        <th scope="col">Supprimer</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.data.map((prod, index) => (
                        <tr key={prod.id}>
                          {realId && (
                          <div className="modal fade" id="basicModal">
                            <div className="modal-dialog">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5 className="modal-title">
                                    confirmation de suppression
                                  </h5>
                                  <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                  ></button>
                                </div>
                                <div className="modal-body">
                                  le produit numero <i>{realId.id}</i> dont le nom est <b>{realId.name}</b> 
                                  <b></b> sera supprimer de votre base de
                                  donnees. voulez vous continuer cette action ?
                                </div>
                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                  >
                                    non
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal"
                                    onClick={(e) => deleteItem(e, realId.id)}
                                  >
                                    oui
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          )}

                          <th>
                            <a href="#">{index + 1}</a>
                          </th>
                          <td>
                            <img
                            src={`${import.meta.env.VITE_API_BASE_URL}/storage/${prod.image}`}
                              alt=""
                              height="60"
                            />
                          </td>
                          <td>{prod.product_name}</td>
                          <td>
                            <a href="#" className="text-secondary">
                              {prod.description.slice(0, 70)}...
                            </a>
                          </td>
                          <td>
                            {prod.price_per_unit} {prod.unit}
                          </td>
                          <td>
                            {prod.quantity}
                          </td>
                          <td>
                            <span className="badge bg-warning text-dark">
                              {prod.stauts ? "sold" : "not sold"}
                            </span>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-outline-info"
                              onClick={() => seeProduct(prod.id)}
                            >
                              <i className="bi-eye-fill"></i>
                              modifier
                            </button>
                          </td>
                          <td>
                            <button
                              type="button"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              className="btn btn-outline-danger"
                              onClick={()=>handleRealId(prod.id, prod.product_name)}
                            >
                              <i className="bi-trash"></i>
                              supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="btn btn-primary mx-2"
                    >
                      previous
                    </button>
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage === Math.ceil(products.total / itemsPerPage)
                      }
                    >
                      next
                    </button>
                  </div>
                </> : ''
                }

            </div>
          </div>
        </div>
      </div>

    </>
  );
}
