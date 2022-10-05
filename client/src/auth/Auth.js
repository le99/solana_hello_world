import * as React from 'react';
import {useState, useEffect} from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
const solanaWeb3 = require('@solana/web3.js');

import {
  useLocation,
  Navigate,
} from "react-router-dom";

let AuthContext = React.createContext(null);


function localSaveAccount(account){
  if(account == null){
    return localStorage.clear('auth');
  }
  localStorage.setItem('auth', JSON.stringify(account));
}

function localGetAccount(){
  let r = localStorage.getItem('auth');
  if(!r){
    return null;
  }
  return JSON.parse(r);
}

function localRemoveAccount(){
  localStorage.removeItem('auth');
}



export const getProvider = () => {
  if ('phantom' in window) {
    const provider = window.phantom && window.phantom.solana;

    if (provider.isPhantom) {
      return provider;
    }
  }
  window.open('https://phantom.app/', '_blank');
};

async function initPhantom(){
  const provider = getProvider(); // see "Detecting the Provider"
  if(provider){
    const resp = await provider.connect();
    return resp.publicKey;
  }

  throw new Error("mmm");
}

const phantomPromise = initPhantom();

export function AuthProvider({ children }) {

  let [user, setUser] = useState(null);
  let [userLoading, setUserLoading] = useState(true);

  let [phantomErr, setPhantomErr] = useState(null);


  useEffect(() => {

    (async() => {
      try{
        let u = await phantomPromise;
        setUser(u);
        setUserLoading(false);

        const provider = getProvider();

        provider.on("connect", (publicKey) => {
          setUser(publicKey);
          setUserLoading(false);
        });

        provider.on("disconnect", () => {
          setUser(null);
          setUserLoading(false);
        });

        provider.on('accountChanged', (publicKey) => {
          setUser(publicKey);
        });
      }
      catch(err){
        setPhantomErr(err.message);
      }

      

    })()

    // const account = localGetAccount();
    // setUser(account);
  }, []);

  let signin = async ({email, password}) => {
    let account = {email}
    if(!email){
      account = {email:'default@default.com'}
    }
    // localSaveAccount(account);
    // setUser(account);
  };

  let recover = async () => {
  };

  let signout = () => {
    localRemoveAccount();
    setUser(null);
  };

  let value = { user, signin, signout, recover, phantomErr };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.object
};

export function useAuth() {
  return React.useContext(AuthContext);
}


export function RequireAuth({ children }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  if(auth.userLoading){
    return (<p>Loading</p>);
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.object
};