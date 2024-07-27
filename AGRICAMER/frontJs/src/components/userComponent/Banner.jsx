/* eslint-disable react/prop-types */
import styles from "../css/banner.module.css";
export default function Banner({image, text}) {
  return (
    <div id="banner" className={styles.banner}>
        {text}
      
        {image}
      
    </div>
  );
}
