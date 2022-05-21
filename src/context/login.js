import React, { useState, useEffect} from 'react';
import base64 from 'base-64';
import superagent from 'superagent';
import cookie from 'react-cookies';
import jwt from 'jwt-decode';

const API = 'https://mohammad-auth-api.herokuapp.com/';
export const LoginContext = React.createContext();

export default function Login(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  async function login(username, password) {
    const response = await superagent
      .post(`${API}signin`)
      .set(
        `authorization`,
        `Basic ${base64.encode(`${username}:${password}`)}`
      );
    validateUser(response.body)
  }
  async function signup(username,password,role){
    const response = await superagent.post(`${API}signup`).send({username:username,password:password,role});
    console.log(response.body);
  }
  function validateUser(data) {
    if(data){
    const validUser = jwt(data.token);
    if (validUser) {
      loginState(true, data);
      cookie.save('userData', data);
    } else {
      loginState(false, {});
    }
  }else{
    loginState(false,{});
  }
  }

  function loginState(loggedin,userData){
      setIsLoggedin(loggedin);
      setUserInfo(userData);
  }


  function logout() {
      setUserInfo({});
      setIsLoggedin(false);
      cookie.remove('userData');
  }

  function authorize(capability){
  return userInfo?.actions?.includes(capability)
  }

  
  const state = { isLoggedin, userInfo, login,signup,logout,authorize };

useEffect(()=>{
  
  validateUser(cookie.load('userData'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
  return (
    <LoginContext.Provider value={state}>
      {props.children}
    </LoginContext.Provider>
  );
}
