/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, Navigate } from "react-router-dom";
import styles from "../css/nav.module.css";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../../axios";

export default function Nav() {
  const { theme, setTheme, setToken, token, user, setUser } = useStateContext();

  useEffect(() => {
    const storedString = localStorage.getItem("USER");
    if (storedString) {
      const retrievedUser = JSON.parse(storedString);
      setUser(retrievedUser);
    }
  }, []);

  const onThemeIconChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

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

  return (
    <div className={styles.colorNav}>
      <div className={styles.header}>
        <Link to="/" className={styles.logo}>
          <img src="/images/17.png" alt="" />
        </Link>
        <nav className={styles.navItems}>
          <ol>
            <li>
              <Link to="/accueil">accueil</Link>
            </li>
            <li>
              <a href="#produits"> nos produits</a>
            </li>
            <li>
              <a href="#about">services</a>
            </li>
            <li>
              <a href="#contact">nous contacter</a>
            </li>
          </ol>
        </nav>

        <div className={styles.rightSideBar}>
          <span onClick={() => onThemeIconChange()}>
            {theme === "light" ? (
              <img src="/images/icons/43.svg" alt="" />
            ) : (
              <img src="/images/icons/42.svg" alt="" />
            )}
          </span>
          {token ? (
            <Link
              to="/basket"
              style={{
                padding: "0em",
                backgroundColor: "transparent",
                borderRadius: "0",
                boxShadow: "0 0 0 0 black",
              }}
            >
              <img src="/images/icons/35.svg" alt="ajouter au panier" />
            </Link>
          ) : (
            <Link to="/basket" >
              <img src="/images/icons/35.svg" alt="ajouter au panier" />
            </Link>
          )}
        </div>

        <div>
          {token ? (
            <li className="nav-item dropdown pe-3 mr-3 list-unstyled">
              <Link
                className="nav-link nav-profile d-flex align-items-center pe-0"
                to="#"
                data-bs-toggle="dropdown"
              >
                <img
                  src={`http://127.0.0.1:8000/storage/${user.image}`}
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
                    to="/admin"
                  >
                    <i className="bi-box-arrow-in-up-right"></i>
                    <span>Tableau de board</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <form action="" method="post" onSubmit={onSubmit}>
                    <button
                      type="submit"
                      className="dropdown-item d-flex align-items-center"
                    >
                      {" "}
                      <i className="bi bi-box-arrow-right"></i> deconnexion
                    </button>
                  </form>
                </li>
              </ul>
            </li>
          ) : (
            ""
          )}
        </div>
      </div>

      <div className={styles.sideBarMenu}>
        <div>
          <Link to="/accueil">
            <img src="/images/17.png" alt="" width="70" className="m-2" />
          </Link>
        </div>
        <div className="main-header navbar-expand p-0">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span
                className="nav-link"
                data-widget="control-sidebar"
                data-controlsidebar-slide="true"
                href="#"
                role="button"
              >
                <img src="/images/icons/31.svg" alt="" />
              </span>
            </li>
          </ul>
        </div>

        <aside
          className={
            theme === "light"
              ? "control-sidebar  monAsideDark"
              : "control-sidebar monAsideLight"
          }
        >
          <div>
            <span onClick={() => onThemeIconChange()}>
              {theme === "light" ? (
                <img src="/images/icons/43.svg" alt="" />
              ) : (
                <img src="/images/icons/42.svg" alt="" />
              )}
            </span>
            <Link to="/basket" className="aside-btn">
              <img src="/images/icons/35.svg" alt="ajouter au panier" />
            </Link>
            {token ? (
              <li className="nav-item dropdown pe-3 list-unstyled">
                <Link
                  className="nav-link nav-profile d-flex align-items-center pe-0 makeRed"
                  to="#"
                  data-bs-toggle="dropdown"
                >
                  <img
                    src={`http://127.0.0.1:8000/storage/${user.image}`}
                    alt="rien"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                  <span className="d-none d-md-block dropdown-toggle ps-2 ">
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
                      <span>Page admin</span>
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <form action="" method="post" onSubmit={onSubmit}>
                      <button
                        type="submit"
                        className="dropdown-item d-flex align-items-center"
                      >
                        {" "}
                        <i className="bi bi-box-arrow-right"></i> deconnexion
                      </button>
                    </form>
                  </li>
                </ul>
              </li>
            ) : (
              ""
            )}
          </div>

          <div>
            <Link to="/accueil">accueil</Link>
            <a href="#produits">produits</a>
            <a href="#about">services</a>
            <a href="#contact">contact</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
