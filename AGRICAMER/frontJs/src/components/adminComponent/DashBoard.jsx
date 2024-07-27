/* eslint-disable react-hooks/exhaustive-deps */
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios";
// import axiosClient from "../../axios";

export default function DashBoard() {
  const { token, user, setUser, setToken } = useStateContext();

  useEffect(() => {
    const storedString = localStorage.getItem("USER");
    if (storedString) {
      const retrievedUser = JSON.parse(storedString);
      setUser(retrievedUser);
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/logout")
      .then(() => {
        setUser({});
        setToken(null);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });
  };

  if (!token) {
    return <Navigate to="/admin/login" />;
  }
  // if (token && user.role != "agriculteur"){
  //   return <Navigate to="/" />
  // }
  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="images/17.png" alt="" />
            <span className="d-none d-lg-block">AgriCamer</span>
          </a>
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search"></i>
              </a>
            </li>

            <li className="nav-item dropdown pe-3">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src = {`${import.meta.env.VITE_API_BASE_URL}/storage/${user.image}`}
                  alt="rien"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user.name}
                </span>
              </Link>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user.name}</h6>
                  <span>{user.role}</span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to="/"
                  >
                    <i className="bi-box-arrow-in-up-right"></i>
                    <span>Page d&apos;accueil</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-person"></i>
                    <span>Mon profile</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <a
                    className="dropdown-item d-flex align-items-center"
                    href="users-profile.html"
                  >
                    <i className="bi bi-gear"></i>
                    <span>Mon compte</span>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <form action="" method="post" >
                    <button
                      type="submit"
                      className="dropdown-item d-flex align-items-center"
                      onClick={(e) => onSubmit(e)}
                    >
                      {" "}
                      <i className="bi bi-box-arrow-right"></i> deconnexion
                    </button>
                  </form>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>

      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav my-5" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link text-teal" to="/admin">
              <i className="bi bi-grid"></i>

              <span>Tableau de board</span>
            </Link>
            <ul id="components-nav" className="nav-content">
              <li>
                <Link to="/admin/products">
                  <i className="bi bi-menu-button-wide"></i>
                  <span>Produits</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </aside>

      <main id="main" className="main">
        <div className="">
          <h1>Tableau De Board</h1>

          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/admin">tableau de board</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin/products">produits</Link>
              </li>
            </ol>
          </nav>
        </div>

        <section className="section dashboard">
          <Outlet />
        </section>
      </main>
    </>
  );
}
