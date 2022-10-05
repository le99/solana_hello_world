import React from 'react';
import {useAuth} from './auth/Auth';
import Navbar from './navbar/Navbar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import SmallContainer from './util/SmallContainer'
import {getProvider} from './auth/Auth';


import * as web3 from '@solana/web3.js';


function App() {

  let auth = useAuth();


  async function onClick(){
    let provider = getProvider();
    const network = "http://127.0.0.1:8899";

    const connection = new web3.Connection(network);
    // const transaction = new web3.Transaction();
    // const { signature } = await provider.signAndSendTransaction(transaction);
    // await connection.getSignatureStatus(signature);

    let payer = web3.Keypair.generate();
    console.log("Generated payer address:", payer.publicKey.toBase58());
  
    // fund the "throw away" wallet via an airdrop
    console.log("Requesting airdrop...");
    let airdropSignature = await connection.requestAirdrop(
      payer.publicKey,
      web3.LAMPORTS_PER_SOL,
    );
  
    // wait for the airdrop to be completed
    await connection.confirmTransaction(airdropSignature);
  
    // log the signature to the console
    const SOLANA_CLUSTER = "abs"; 

    console.log(
      "Airdrop submitted:",
      `https://explorer.solana.com/tx/${airdropSignature}?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899`,
    );
  

  }

  return (
    <SmallContainer>
      <p>Hi: {JSON.stringify(auth.user)}</p>
      <button onClick={onClick}>Click</button>
    </SmallContainer>
  );
}

export default App;
