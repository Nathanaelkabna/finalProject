import styles from "../css/accueil.module.css";
import AboutUs from "./AboutUs";
import Banner from "./Banner";
import BannerImage from "./BannerImage";
import BannerText from "./BannerText";
import Contact from "./Contact";
import Mobile from "./Mobile";
import Produits from "./NosProduits";
// import ProduitItem from "./ProduitItem.jsx";
export default function Acceuil() {
  return (
    <>
      <div className={styles.welcomePage}>
        <Banner image={<BannerImage />} text={<BannerText />} />
      </div>

      <Produits />

      <Mobile />

      <AboutUs />

      <Contact />

    </>
  );
}
