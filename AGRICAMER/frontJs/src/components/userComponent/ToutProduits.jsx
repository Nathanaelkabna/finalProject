/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios";
export default function ToutProduits()
{
  // const {token} = useStateContext();
  // if(!token){
  //   return <Navigate to="/"/>
  // }
    return <>

    <NosProduits />
        
    </>
}

/* eslint-disable no-unused-vars */


function NosProduits() {
  const { user, theme } = useStateContext();
  const [errors, setErrors] = useState({ __html: "" });
  const [itemsPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState([]);
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

  useEffect(() => {
    const fetchProducts = (pageNumber) => {
      setErrors({ __html: "" });
      axiosClient
        .get(`/products?page=${pageNumber}&itemsPerPage=${itemsPerPage}`)
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
    };
    fetchProducts(currentPage);
  }, [currentPage, user.id]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const isEmpty = (array) => {
    return Array.isArray(array) && array.length === 0;
  };

  const onHandleSubmit = (e) => {
    e.preventDefault()
  }

  const onFilterCategory = (e) => {
    e.preventDefault();
    console.log(e.target.value)
   setSearch(e.target.value);
  };

  return (
    <>
      <section id="produits" className="portfolio">
        <div className="container text-center my-3">
          <h2>nos produits</h2>
          <p>nos produits</p>
        </div>

        <div className="d-flex justify-content-center container my-3 form-group">
            <input type="search" name="" className="form-control py-4" id=""  placeholder="rechercher vos produits...."/>
        </div>

        <div className="container">
          <div
            className="isotope-layout"
            data-default-filter="*"
            data-layout="masonry"
            data-sort="original-order"
          >
            <form action="" method="post" onSubmit={onHandleSubmit}>
                
              <ul
                className="portfolio-filters isotope-filters"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <li>categorie : </li>
                <li   className="filter-active">
                  All
                </li>
                {categories.map((category) => (
                  <button
                    type="submit"
                    key={category.id}
                    className= {theme==='light' ? "btn  btn-outline-dark mx-1" : "btn  btn-outline-light mx-1" } 
                    onClick={onFilterCategory}
                    value={category.id}
                  >
                    {category.name}
                  </button>
                ))}
              </ul>
              <div className="row gy-4 isotope-container">
                {isEmpty(products) ? (
                  <div>aucun produit</div>
                ) : (
                  <>
                    {products.data.map((prod) =>
                      categories.map((category) =>
                        prod.category_id === category.id ? (
                          <div
                            key={prod.id}
                            className="col-lg-4 col-md-6 portfolio-item isotope-item filter-app"
                          >
                            <div className="portfolio-content rounded-2" style={{height:"auto"}}>
                              <img
                              src={`${import.meta.env.VITE_API_BASE_URL}/storage/${prod.image}`}
                                className="img-fluid h-100"
                                alt=""
                              />
                              <div className="portfolio-info">
                                <h4>{category.name}</h4>
                                <Link
                                  to={`${import.meta.env.VITE_API_BASE_URL}/storage/${prod.image}`}
                                  
                                  data-gallery="portfolio-gallery-app"
                                  className="glightbox preview-link"
                                >
                                  <i className="bi bi-zoom-in"></i>
                                </Link>
                                <Link
                                  to={`/product/${prod.id}`}
                                title="voir produit"
                                  className="details-link"
                                >
                                  <i className="bi bi-link-45deg"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    )}
                    <div className="d-flex justify-content-center">
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
                          currentPage ===
                          Math.ceil(products.total / itemsPerPage)
                        }
                      >
                        next
                      </button>
                    </div>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
