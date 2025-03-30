import {
  useContext,
  createContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const start_state = {
    user: {},
    token: "",
    loading: false,
    isAuthenticated: false,
  };

  const reduceFunction = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        return action.payload;
      case "LOGOUT":
        return start_state;
      case "STARTLOADING":
        return {
          ...state,
          loading: true,
        };
      case "ENDLOADING":
        return {
          ...state,
          loading: false,
        };

      default:
        break;
    }
  };

  const [state, dispatch] = useReducer(reduceFunction, start_state);
  const handleLogin = async (email, password) => {
    dispatch({ type: "STARTLOADING" });
    await axios
      .post("http://127.0.0.1:8000/api/user/login/", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch({
            type: "LOGIN",
            payload: {
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              loading: false,
            },
          });
          sessionStorage.setItem("token", response.data.token);
          return true;
        }
        alert("Invalid Credentials");
        dispatch({ type: "ENDLOADING" });
        return false;
      })
      .catch(() => {
        alert("Something went wrong");
        dispatch({ type: "ENDLOADING" });
        return false;
      });
  };

  const handleLogout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/user/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: "LOGOUT" });
        sessionStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        handleLogin,
        handleLogout,
        loading: state.loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const UseAuth = () => {
  return useContext(AuthContext);
};
