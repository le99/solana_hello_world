import * as web3 from '@solana/web3.js';
import {Buffer} from 'buffer/';
import * as Adapter from '@solana/wallet-adapter-wallets';

import * as anchor from "@project-serum/anchor";
import { AnchorProvider, Program } from "@project-serum/anchor";
// import { CounterAnchor } from "./counter_anchor";
import * as idl  from './counter_anchor.json';

const adapter = new Adapter.PhantomWalletAdapter();

const SOLANA_CLUSTER = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";
const PROGRAM_ID = "Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS";
const PRIVATE_KEY = "0bf51a027c36bac4e0372e59e809a29273467ff69b996a82cd11a048edb33015a9f656a0a9ca129049780d1b8666ae0a90d4c332a40572bbaa2da8f5ce032cb1";

import {getProvider, initPhantom} from '../auth/Auth';
import * as  BN from 'bn.js';

const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');



export async function airDrop(publicKey){

  const network = "http://127.0.0.1:8899";

  const connection = new web3.Connection(network);
  let payer = {publicKey};
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

  console.log(
    "Airdrop submitted:",
    `https://explorer.solana.com/tx/${airdropSignature}?cluster=${SOLANA_CLUSTER}`,
  );
}


export async function createCounter(publicKey){

  const network = "http://127.0.0.1:8899";
  const connection = new web3.Connection(network);
  const provider = new AnchorProvider(connection, adapter, {});


  // let provider = getProvider();

  anchor.setProvider(provider);

  
  const program = new anchor.Program(idl, new web3.PublicKey(PROGRAM_ID), provider);

  const counterKeypair = web3.Keypair.fromSecretKey(fromHexString(PRIVATE_KEY));
  const counter = counterKeypair.publicKey;

  adapter.on("connect", async () =>{
    await program.methods
      .initializeCounter()
      .accounts({ counter, payer: program.provider.publicKey })
      .signers([counterKeypair])
      .rpc({ skipPreflight: true, commitment: "confirmed" });

    let currentCount = (await program.account.counter.fetch(counter, "confirmed")).count.toNumber();

    console.log(currentCount);
  });

  await adapter.connect();

  console.log("a");

 

  return;

}

export async function getCounterValue(){
  const network = "http://127.0.0.1:8899";
  const connection = new web3.Connection(network);
  const counterKeypair = web3.Keypair.fromSecretKey(fromHexString(PRIVATE_KEY));
  const counter = counterKeypair.publicKey;
  let counterAccountInfo = await connection.getAccountInfo(counter, { commitment: "confirmed" });
  let val = new BN(counterAccountInfo.data, 'le').toNumber();
  return val;
}


export async function incrementCounter(publicKey){
  
  let provider = getProvider();


  const network = "http://127.0.0.1:8899";

  const connection = new web3.Connection(network);
  let payer = {publicKey};

  const counterKeypair = web3.Keypair.fromSecretKey(fromHexString(PRIVATE_KEY));
  const counter = counterKeypair.publicKey;


  const COUNTER_ACCOUNT_SIZE = 8;
  const allocTx = web3.SystemProgram.createAccount({
    fromPubkey: payer.publicKey,
    newAccountPubkey: counter,
    lamports: await connection.getMinimumBalanceForRentExemption(COUNTER_ACCOUNT_SIZE),
    space: COUNTER_ACCOUNT_SIZE,
    programId: new web3.PublicKey(PROGRAM_ID)
  });


  const tx2 = new web3.TransactionInstruction({
    programId: new web3.PublicKey(PROGRAM_ID),
    keys: [
      {
        pubkey: counter,
        isSigner: false,
        isWritable: true
      }
    ],
    data: Buffer.from([0x0])
  });


  let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  // create an empty transaction
  let transaction = new web3.Transaction({
    feePayer: payer.publicKey,
    recentBlockhash: blockhash,
  });

  // add a single instruction to the transaction
  transaction.add(tx2);

  // submit the transaction to the cluster
  console.log("Sending transaction...");
  const { signature } = await provider.signAndSendTransaction(transaction);
}