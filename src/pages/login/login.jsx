import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormFieldEmail } from "../../components/form-fields/email/email";
import { useFormFieldPassword } from "../../components/form-fields/password/password";
import { login, getUser } from "../../services/actions/profile";
import styles from "./login.module.css";
import { FORGOT_PASSWORD_ROUTE, REGISTER_ROUTE } from "../../const/routes";

const isLoginSelector = state => !!state.profile.name
const errorSelector = state => state.profile.request.error
const loadingSelector = state => state.profile.request.loading

export function LoginPage() {
  const [formValid, setFormValid] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  const isLogin = useSelector(isLoginSelector);
  const error = useSelector(errorSelector);
  const loading = useSelector(loadingSelector);

  const init = useRef();

  const {
    field: passwordField,
    valid: passwordValid,
    value: password,
  } = useFormFieldPassword();

  const {
    field: emailField,
    valid: emailValid,
    value: email,
  } = useFormFieldEmail();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(getUser())
    if (isLogin && !init.current) {
      init.current = true;
      const route =
        state?.protectedFrom === pathname ? -1 : state?.protectedFrom || -1;
      navigate(route, { replace: true });
    }
  }, [isLogin, state]);

  useEffect(() => {
    setFormValid(!!emailValid && !!passwordValid);
  }, [emailValid, passwordValid]);

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <h2 className="text text_type_main-medium">Вход</h2>
      {emailField}
      {passwordField}
      {error && <p className={styles.error}>{error}</p>}
      <Button
        htmlType="submit"
        type="primary"
        size="medium"
        disabled={!formValid || loading}
      >
        Войти
      </Button>

      <div className={styles.links}>
        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Вы — новый пользователь?
          </span>
          <Link to={REGISTER_ROUTE} className={styles.link}>
            Зарегистрироваться
          </Link>
        </div>

        <div className="mb-4">
          <span className="mr-2 text text_type_main-default text_color_inactive">
            Забыли пароль?
          </span>
          <Link to={FORGOT_PASSWORD_ROUTE} className={styles.link}>
            Восстановить пароль
          </Link>
        </div>
      </div>
    </form>
  );
}
