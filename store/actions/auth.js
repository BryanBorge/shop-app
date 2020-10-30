export const SIGN_UP = "SIGN_UP";
export const LOGIN = "LOGIN";

export const signUp = (email, password) => {
  return async dispatch => {
    console.log("Sign up dispatch");

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9_RY9rFW4c-ALPIurcAPjNLOXTuD8Q7w",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Request didnt work. Not signed up");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: SIGN_UP });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    console.log("login dispatch");

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9_RY9rFW4c-ALPIurcAPjNLOXTuD8Q7w",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Request didnt work. Not logged in");
    }

    const resData = await response.json();
    console.log(resData);
    dispatch({ type: LOGIN });
  };
};
