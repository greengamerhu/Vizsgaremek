import { createContext, useEffect, useState } from "react";
// import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import { loginApi, registerAPi } from "../api/AuthApi";
import { formatErrorMessage } from "../utilities/formatErrorMessage";

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

          toast.success("register Success!");
          navigate("/login");
        }
      })
      .catch((e) => { if(e.response.status != 201) {
            formatErrorMessage(e.response.data.message).map( err => {
                console.log(err)
                toast.warning(err)  
            })

            // console.log(formatErrorMessage(e.response.data.message))
      } else {
        
      }
        });
  };

  const loginUser = async (username: string, password: string) => {
    console.log("gec")
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
          

          toast.success("Login Success!");
        }
      })
      .catch((e) => toast.warning(e));
  };



  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // setUser(null);
    setToken("");
    setIsLoggedIn(false)
    navigate("/");
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