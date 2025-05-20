import { createContext, useEffect, useState } from "react";
// import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { loginApi, logOutApi, registerAPi } from "../api/AuthApi";
import { formatErrorMessage } from "../utilities/formatErrorMessage";
import { useShoppingCart } from "./ShoppingCartContext";

type AuthContextType = {
//   user: UserProfile | null;
  token: string | null;
  registerUser: (fullName : string, email : string, password : string, repassword : string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn:  boolean;
};

type Props = { children: React.ReactNode };

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsLoggedIn(true);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    fullName : string,
    email : string, 
    password : string, 
    repassword : string
  ) => {
    await registerAPi(fullName,email, password,repassword)
      .then((res) => {
        if (res) {
          toast.success("Sikeres regisztráció!");
          navigate("/login");
        }
      })
      .catch((e) => { if(!(e.code == "ERR_NETWORK")  && e.response.status != 201) {
            formatErrorMessage(e.response.data.message).map( err => {
                console.log(err)
                toast.warning(err)  
            })
      } else {
        toast.warning("A szerver nem elérhető")
      }
        });
  };

  const loginUser = async (username: string, password: string) => {
    await loginApi(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          // const userObj = {
          //   userName: res?.data.userName,
          //   email: res?.data.email,
          // };
          // localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setIsLoggedIn(true)
          

          toast.success("Sikeres Bejelentkezés!");
        }
      })
      .catch((e) => { if(!(e.code == "ERR_NETWORK")  && e.response.status != 201 ) {
            formatErrorMessage(e.response.data.message).map( err => {
                console.log(err)
                toast.warning(err)  
            })

            // console.log(formatErrorMessage(e.response.data.message))
      } else {
        toast.warning("A szerver nem elérhető")
      }
        });
  };



  const logout = async () => {
    await logOutApi()
    .then((res) => {
      if(res) {
        localStorage.removeItem("token");
        setToken("");
        setIsLoggedIn(false)
        navigate("/login");
      }
    }).catch((e) => {
      if(e.status == 401) {
        setToken("")
        setIsLoggedIn(false)
        navigate("/")
      } else{
        console.log(e)
        toast.warning(e.message)
      }
    })

  
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);