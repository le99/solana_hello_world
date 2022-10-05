import React from 'react';
import {useAuth} from './auth/Auth';
import Navbar from './navbar/Navbar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import SmallContainer from './util/SmallContainer'
import {getProvider, initPhantom} from './auth/Auth';


import * as web3 from '@solana/web3.js';


const PROGRAM_ID = "4uWRvwKL9xzdxtfTBSYc7Eh3CjMeY9CAs7Db6wXnb72a";
const SOLANA_CLUSTER = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";
//https://docs.phantom.app/integrating/extension-and-in-app-browser-web-apps/sending-a-transaction
//https://stackoverflow.com/questions/71021177/transaction-recent-blockhash-required-phantom-wallet-solana
//https://buildspace.so/p/build-solana-web3-app

function App() {

  // let auth = useAuth();


  async function onClick(){
    let provider = getProvider();

    let pk = await initPhantom();

    const network = "http://127.0.0.1:8899";

    const connection = new web3.Connection(network);
    // const transaction = new web3.Transaction();
    // const { signature } = await provider.signAndSendTransaction(transaction);
    // await connection.getSignatureStatus(signature);

    // let payer = web3.Keypair.generate();
    let payer = {publicKey: pk};
    console.log("Generated payer address:", payer.publicKey.toBase58());
  
    // fund the "throw away" wallet via an airdrop
    // console.log("Requesting airdrop...");
    // let airdropSignature = await connection.requestAirdrop(
    //   payer.publicKey,
    //   web3.LAMPORTS_PER_SOL,
    // );
  
    // // wait for the airdrop to be completed
    // await connection.confirmTransaction(airdropSignature);
  
    // log the signature to the console

    // console.log(
    //   "Airdrop submitted:",
    //   `https://explorer.solana.com/tx/${airdropSignature}?cluster=${SOLANA_CLUSTER}`,
    // );

    let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
    // create an empty transaction
    let transaction = new web3.Transaction({
      feePayer: payer.publicKey,
      recentBlockhash: blockhash
    });

    // add a single instruction to the transaction
    transaction.add(
      new web3.TransactionInstruction({
        keys: [
          {
            pubkey: payer.publicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: new web3.PublicKey(PROGRAM_ID),
      }),
    );

    // submit the transaction to the cluster
    console.log("Sending transaction...");
    const { signature } = await provider.signAndSendTransaction(transaction);

    // console.log(
    //   "Transaction submitted:",
    //   `https://explorer.solana.com/tx/${txid}?cluster=${SOLANA_CLUSTER}`,
    // );
  

  }

  return (
    <SmallContainer>
      {/* <p>Hi: {JSON.stringify({}))}</p> */}
      <button onClick={onClick}>Click</button>
    </SmallContainer>
  );
}

export default App;
