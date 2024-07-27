import { Link } from "react-router-dom";
import styles from "../css/footer.module.css";
export default function Footer() {
  return (
    <div className={styles.mainfooter}>
      <div className={styles.foot1}>
        <footer>
          <h1>Adresse</h1>
          <div className={styles.adresseContent}>
            <span>
              <img src="images/icons/46.svg" alt="" />
              lieux
            </span>
            <span>
              <img src="images/icons/45.svg" alt="" />
              +237 686-763-670
            </span>
            <span>
              <img src="images/icons/47.svg" alt="" />
              kabna10paul@gmail.com
            </span>
            <span>
              <img src="images/icons/49.svg" alt="" />
              <img src="images/icons/50.svg" alt="" />
              <img src="images/icons/51.svg" alt="" />
              <img src="images/icons/52.svg" alt="" />
            </span>
          </div>
        </footer>
        <footer className={styles.infosContent}>
          <h1>infos</h1>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            nihil esse earum possimus quisquam veniam dolores molestiae quasi.
            Qui repudiandae libero minus iste, nulla perferendis voluptates
            blanditiis consectetur quam rem.
          </div>
        </footer>
        <footer className={styles.menuContent}>
          <h1>liens</h1>
          <div>
            <Link>accueil</Link>
            <Link>produits</Link>
            <Link>services</Link>
            <Link>contact</Link>
          </div>
        </footer>
        <footer className={styles.subscribeContent}>
          <h1>souscrire</h1>
          <div className="form-group">
            <form action="" method="post">
              <input type="email" name="" id=""  className="form-control" placeholder="enter email"/>
              <button type="submit" className="btn btn-success btn-block mt-2">souscrire</button>
            </form>
          </div>
        </footer>
      </div>

      <div className={styles.foot2}>
      <a href="#" id="scroll-top" className={styles.scrollToTop}><i className="bi bi-arrow-up-short"></i></a>
        <div className={styles.google}>
          <div className={styles.textGoogle}>
            plus de fonctionnalites, telecharger l&apos;application sur votre
            smartphone
          </div>
          <Link to="/">
            <img src="images/icons/29.png" alt="" />
            <div className={styles.play}>
              get it on <br />
              <span>Google play</span>
            </div>
          </Link>
        </div>
      </div>


      
    </div>
  );
}
