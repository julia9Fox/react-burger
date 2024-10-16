import {
  Button,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_ORDER, createOrder } from "../../services/actions/order";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import styles from "./order.module.css";
import { getUser } from "../../services/actions/profile";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../../const/routes";

const initialState = { totalPrice: 0 };

function totalPriceReducer(state, action) {
  switch (action.type) {
    case "reset":
      return { totalPrice: 0 };
    case "bun":
      return { totalPrice: state.totalPrice + action.payload.price * 2 };
    case "ingredient":
      return { totalPrice: state.totalPrice + action.payload.price };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

  const ingredientsSelector = state => state.ingredients.data
  const orderSelector = state => state.order.data?.number
  const orderLoadingSelector = state => state.order.loading
  const errorSelector = state => state.order.error
  const orderOpenSelector = state => state.order.open

const OrderTotal = (props) => {
  const ingredients = useSelector(ingredientsSelector);
  const order = useSelector(orderSelector);
  const orderLoading = useSelector(orderLoadingSelector);
  const error = useSelector(errorSelector);
  const orderOpen = useSelector(orderOpenSelector);

  const ingredientsMap = useMemo(
    () =>
      new Map(ingredients.map((ingredient) => [ingredient._id, ingredient])),
    [ingredients]
  );
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();

  const [totalPriceState, totalPriceDispatch] = useReducer(
    totalPriceReducer,
    initialState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    totalPriceDispatch({ type: "reset" });

    if (props.bunItem) {
      totalPriceDispatch({
        type: "bun",
        payload: ingredientsMap.get(props.bunItem),
      });
    }

    props.orderIngredients.forEach(({ id }) => {
      totalPriceDispatch({
        type: "ingredient",
        payload: ingredientsMap.get(id),
      });
    });

    setValid(Boolean(props.bunItem));
  }, [ingredientsMap, props.bunItem, props.orderIngredients]);

  const onCompleteClick = useCallback(() => {
    dispatch(getUser())
      .unwrap()
      .then((user) => {
        if (!user) throw "";
        dispatch(
          createOrder(
            [
              props.bunItem,
              ...props.orderIngredients.map(({ id }) => id),
            ].filter(Boolean)
          )
        );
      })
      .catch(() => {
        navigate(LOGIN_ROUTE);
      });
  }, [props.bunItem, props.orderIngredients]);
  const onCompleteModalClose = useCallback(() => {
    dispatch(CLOSE_ORDER());
  }, [dispatch]);

  return (
    <>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.total}>
        <p className="text text_type_digits-medium mr-2">
          {totalPriceState.totalPrice}
        </p>
        <div className={styles.totalIcon}>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          extraClass="ml-10"
          disabled={orderLoading || !valid}
          onClick={onCompleteClick}
        >
          Оформить заказ
        </Button>
        {orderOpen && (
          <Modal onClose={onCompleteModalClose}>
            <OrderDetails order={order} />
          </Modal>
        )}
      </div>
    </>
  );
};
OrderTotal.propTypes = {
  bunItem: PropTypes.string,
  orderIngredients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      uuid: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default memo(OrderTotal);
