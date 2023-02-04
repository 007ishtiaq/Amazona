import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);
  const removeFromCartHandler = (id) => {

  }

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is Empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            {cartItems.map(
              (item) => (
                <li key={item.product}>
                  <div className="row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="mon-30">
                    <Link to={`/product/${item.product}`}> {item.name} </Link>
                  </div>
                  <div className="mon-30">
                    <select value={item.qty} onChange= {e => dispatch(addToCart(item.product), Number(e.target.value))}> 
                    {[...Array(item.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                    </select>
                  </div>
                  <div>
                  <div> Rs {item.price} </div>
                  </div>
                  <div>
                  <button type="button" onClick={()=> removeFromCartHandler(item.product)}> Delete </button>
                  </div>


                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CartScreen;
