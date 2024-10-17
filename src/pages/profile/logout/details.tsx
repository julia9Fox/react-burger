import { FC, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../../const/routes";
// import { IState, TDispatch } from "../../../models";
import { logout } from "../../../services/actions/profile";
import { useAppDispatch, useAppSelector } from "../../../hooks/store";
import styles from "./details.module.css";

export const LogoutPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLogout, error, loading } = useAppSelector((state) => ({
    isLogout: !state.profile.name,
    error: state.profile.request.error,
    loading: state.profile.request.loading,
  }));

  useEffect(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      navigate(LOGIN_ROUTE, { replace: true });
    }
  }, [isLogout, navigate]);

  return loading ? <>Выход...</> : <p className={styles.error}>{error}</p>;
};
