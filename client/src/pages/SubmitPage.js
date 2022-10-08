import React from 'react';
import {useAuth} from '../auth/Auth';
import Navbar from '../navbar/Navbar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import SmallContainer from '../util/SmallContainer'
import {getProvider, initPhantom} from '../auth/Auth';
import * as  BN from 'bn.js';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import * as solana from '../util/solana';
import LoadingButton from '@mui/lab/LoadingButton';

import * as web3 from '@solana/web3.js';
import {Buffer} from 'buffer/';

const PROGRAM_ID = "4uWRvwKL9xzdxtfTBSYc7Eh3CjMeY9CAs7Db6wXnb72a";
const SOLANA_CLUSTER = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";

const PRIVATE_KEY = "0bf51a027c36bac4e0372e59e809a29273467ff69b996a82cd11a048edb33015a9f656a0a9ca129049780d1b8666ae0a90d4c332a40572bbaa2da8f5ce032cb1";

const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


function App() {

  let auth = useAuth();

  const [tradeWait, setTradeWait] = React.useState(false);

  const [submitSuccess, setSubmitSuccess] = React.useState(null);

  const [amount, setAmount] = React.useState("");
  function onChangeAmount(event){
    setAmount(event.target.value);
  }

  async function onClick(){
    setTradeWait(true);
    try{
      await solana.incrementCounter(auth.user);
    }
    catch(err){
      console.log();
    }
    setTradeWait(false);

    setSubmitSuccess(amount);
  } 

  return (
    <SmallContainer>
      <Typography component="h1" variant="h5">
        Oracle data submission
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="SOL/USDC"
        type="text"
        id="password"
        autoComplete="current-password"
        value={amount}
        onChange={onChangeAmount}
      />

      {(submitSuccess) &&
        <Typography component="h1" variant="subtitle1">
          {"Submission Succesfull"}
        </Typography>
      }

      {tradeWait?
        <LoadingButton 
          fullWidth
          loading variant="outlined">
          Submit
        </LoadingButton>   
        :
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 0, mb: 0, ml: 1 }}
          onClick={onClick}
        >
          Submit
        </Button>

      }

    </SmallContainer>
  );
}

export default App;
