import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/actions/profile";
import { useNavigate } from "react-router-dom";
import styles from "./details.module.css";
import { LOGIN_ROUTE } from "../../../const/routes";

const isLogoutSelector = state => !state.profile.name
const errorSelector = state => state.profile.request.error
const loadingSelector = state => state.profile.request.loading

export function LogoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogout = useSelector(isLogoutSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLogout]);

  return loading ? "Выход..." : <p className={styles.error}>{error}</p>;
}
