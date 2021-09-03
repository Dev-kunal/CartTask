import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  increaseQuantity,
  decreaseQuantity,
  removeSavings,
  preserveSavings,
} from "./cartSlice";

export const Basket = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [subTotal, setsubTotal] = useState(0);
  const [totalSavings, setTotalSavings] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setsubTotal(
      cartItems
        .reduce(
          (acc, product) => acc + parseFloat(product.price) * product.quantity,
          0
        )
        .toFixed(2)
    );
    setTotalSavings(
      cartItems
        .reduce((acc, product) => acc + parseFloat(product.savings), 0)
        .toFixed(2)
    );
  }, [cartItems]);

  const soupAndTwoBreads = () => {
    return (
      cartItems.some((item) => item.name === "Soup") &&
      cartItems.some((item) => item.name == "Bread")
    );
  };

  const incQuantity = ({ id, name, price, quantity }) => {
    if (name === "Bread" && quantity >= 1 && soupAndTwoBreads()) {
      const discount = parseFloat(price / 2).toFixed(2);
      dispatch(increaseQuantity({ id, discount }));
    } else if (name === "Cheese" && quantity >= 1) {
      const discount =
        quantity % 2 === 0
          ? (parseFloat(price) * quantity) / 2
          : parseFloat(price);
      dispatch(increaseQuantity({ id, discount }));
    } else {
      dispatch(increaseQuantity({ id, discount: 0 }));
    }
  };
  const decQuantity = ({ id, name, quantity, price }) => {
    dispatch(decreaseQuantity({ id }));
    if (name === "Bread" && quantity <= 2 && soupAndTwoBreads()) {
      dispatch(removeSavings({ id }));
    } else if (name === "Cheese") {
      if (quantity % 2 === 0) {
        const discount = (parseFloat(price) * quantity) / 2;
        dispatch(preserveSavings({ id, discount }));
      }
      dispatch(removeSavings({ id }));
    } else {
    }
  };

  return (
    <div className="products-page">
      <h2>Basket</h2>
      <ul className="product-list">
        {cartItems.map(({ id, name, price, quantity, savings }) => (
          <li key={id} className="basket-item">
            <div className="product in-basket">
              <div>{name}</div>
              <span>
                <span className="grey">£</span> {price}
              </span>
              <div>
                <button
                  className="btn-primary"
                  onClick={() => incQuantity({ id, name, price, quantity })}
                >
                  +
                </button>
                <span style={{ padding: "1rem" }}> {quantity} </span>
                <button
                  className="btn-secondary"
                  onClick={() => decQuantity({ id, name, quantity, price })}
                >
                  -
                </button>
              </div>
            </div>
            <div className="item-price">
              item price £ {price} * {quantity} = £{" "}
              {(parseFloat(price) * quantity).toFixed(2)}
            </div>
            {savings > 0 && (
              <div className="item-price savings">Savings £ {savings}</div>
            )}
          </li>
        ))}
      </ul>
      <div>
        <div className="bill-row">
          <span>Sub Total:</span>
          <span>£ {subTotal}</span>
        </div>
        <div className="bill-row">
          <span>Savings:</span>
          <span>£ {totalSavings}</span>
        </div>
        <div className="bill-row">
          <span>Total Amount:</span>
          <span>£ {(subTotal - totalSavings).toFixed(2)}</span>
        </div>
      </div>
      <NavLink className="link" to="/">
        Products
      </NavLink>
    </div>
  );
};
