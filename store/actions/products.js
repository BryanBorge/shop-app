export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = productId => {
  return { type: DELETE_PRODUCT, pid: productId };
};

export const createProduct = (title, imageURL, price, desc) => {
  return async dispatch => {
    //exec any async code right here
    const response = await fetch(
      "https://shop-app-13be8.firebaseio.com/products.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, imageURL, price, desc }),
      }
    );

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: { title, imageURL, price, desc },
    });
  };
};

export const updateProduct = (id, title, imageURL, desc) => {
  return {
    type: UPDATE_PRODUCT,
    pid: id,
    productData: { title, imageURL, desc },
  };
};
