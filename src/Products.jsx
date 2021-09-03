import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { products } from "./products";
import { addToCart } from "./features/cart/cartSlice";

export const Products = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const isInCart = (id) => {
    return cartItems.some((item) => item.id === id);
  };
  return (
    <div className="products-page">
      <h2>Products</h2>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product">
            <div>{product.name}</div>
            <div>
              <span>
                {" "}
                <span className="grey">£</span> {product.price}
              </span>
              <button
                disabled={isInCart(product.id) ? true : false}
                className={
                  isInCart(product.id) ? "btn-primary disabled" : "btn-primary"
                }
                onClick={() => dispatch(addToCart({ product }))}
              >
                Add
              </button>
            </div>
          </li>
        ))}
      </ul>
      <NavLink className="link" to="/basket">
        Basket
      </NavLink>
    </div>
  );
};
