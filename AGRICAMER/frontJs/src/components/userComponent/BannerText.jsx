import { Link } from "react-router-dom";
import styles from "../css/banner.module.css";
import { useStateContext } from "../../contexts/ContextProvider";
export default function BannerText() {
  const { token } = useStateContext();

  return (
    <div className={styles.bannerText}>
      <h1 className={styles.title}>
        AgriCamer, <br />
        <span>savourez le continent</span>
      </h1>
      <p>
        Découvrez la richesse de nos terres. Des produits agricoles frais et
        authentiques cultivés avec passion pour votre bien-être et respect de la
        nature. Savourez des produits directement du champ à votre table
      </p>
      <div className={styles.bannerLinks}>
        <Link to="/nos-produits" className= {token ? " text-center" : ''}>
          faites vos achats
          <i className="bi-cart-plus ml-2"></i>{" "}
        </Link>
        {token ? (
          ""
        ) : (
          <a href="#inscription">
            se connecter
            <i className="bi-box-arrow-in-right ml-2"></i>
          </a>
        )}
      </div>
    </div>
  );
}
