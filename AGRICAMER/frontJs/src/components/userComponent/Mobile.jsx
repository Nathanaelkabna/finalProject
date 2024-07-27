import { Link } from "react-router-dom"
import styles from "../css/mobile.module.css"

export default function Mobile()
{
    return <>
      <section className={styles.mobile}>
        <div className={styles.phone}>
          <img src="images/22.svg" alt="" />
        </div>
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
      </section>
    </>
}