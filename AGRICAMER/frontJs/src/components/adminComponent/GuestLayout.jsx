import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import styles from "../css/guestLayout.module.css";
export default function GuestLayout() {
  const {token} = useStateContext()

  if(token){
    return <Navigate to="/admin" />
}
  return (
    <div className={styles.landingPage}>
      <Outlet />
    </div>
  );
}
