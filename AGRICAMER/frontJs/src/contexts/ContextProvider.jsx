/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
const StateContext = createContext({
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
  setTheme: () => {},
});

export const ContextProvider = ({ children }) => {
  const [user, _setUser] = useState(localStorage.getItem('USER') || {});
  const [theme, _setTheme] = useState(localStorage.getItem('THEME') || 'light');
  const [token, _setToken] = useState(localStorage.getItem("TOKEN"));

  const setUser = (user) => {
    localStorage.setItem('USER', JSON.stringify(user));
    _setUser(user)
  }

  const setTheme = (theme) => {
    localStorage.setItem('THEME', theme);
    _setTheme(theme)
  }

  const setToken = (token) => {
    if(token){
      localStorage.setItem("TOKEN", token)
    }else{
      localStorage.removeItem("TOKEN");
    }
    
    _setToken(token);

  };
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        theme,
        setTheme,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);