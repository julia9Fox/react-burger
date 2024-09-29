import request from "../utils/request";
import { getCookie } from "../utils/cookie";

export const ACCESS_TOKEN_COOKIE = "accessToken";

export default function createOrder(orderListIds) {
  return request("/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getCookie(ACCESS_TOKEN_COOKIE),
    },
    body: JSON.stringify({
      ingredients: orderListIds,
    }),
  })
    .catch(() => Promise.reject("Ошибка при создании заказа"))
    .then(
      (res) => res.order ?? Promise.reject("Не получен номер заказа с сервера")
    );
}
