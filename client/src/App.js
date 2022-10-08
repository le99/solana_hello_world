import React, { useState } from 'react';
import {useAuth} from './auth/Auth';
import Navbar from './navbar/Navbar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import SmallContainer from './util/SmallContainer'
import {getProvider, initPhantom} from './auth/Auth';
import * as  BN from 'bn.js';

import * as web3 from '@solana/web3.js';
import * as solana from './util/solana';


const PROGRAM_ID = "4uWRvwKL9xzdxtfTBSYc7Eh3CjMeY9CAs7Db6wXnb72a";
const SOLANA_CLUSTER = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";

const PRIVATE_KEY = "0bf51a027c36bac4e0372e59e809a29273467ff69b996a82cd11a048edb33015a9f656a0a9ca129049780d1b8666ae0a90d4c332a40572bbaa2da8f5ce032cb1";

const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


function App() {

  let auth = useAuth();

  let [countVal, setCountValue] = useState(null);

  React.useEffect(() => {
    (async () => {
      try{
        let val = await solana.getCounterValue();
        setCountValue(val);  
      }
      catch(err){
        console.log(err);
      }
    })();
  }, []);



  async function airDrop(){
    return solana.airDrop(auth.user);
  }

  async function onClick(){
    await solana.createCounter(auth.user);
    const val = await solana.getCounterValue();
    setCountValue(val);  
  }

  async function onClick2(){
    await solana.incrementCounter(auth.user, 20);
    const val = await solana.getCounterValue();
    setCountValue(val);  
  }

  return (
    <SmallContainer>
      <button onClick={airDrop}>AirDrop</button>
      <button onClick={onClick}>Create Counter</button>
      <button onClick={onClick2}>Increment</button>

      <div>
        Counter Value: {countVal}
      </div>

    </SmallContainer>
  );
}

export default App;
