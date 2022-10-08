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
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import * as web3 from '@solana/web3.js';
import {Buffer} from 'buffer/';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import * as solana from '../util/solana';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Exchange Rates SOL/USDC',
      color: 'rgba(255, 255, 255, 1)'
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Binance',
      data: labels.map(() => Math.random()*10),
      borderColor: 'rgb(240, 185, 11)',
      backgroundColor: 'rgba(250, 223, 134, 1)',
    },
    {
      label: 'Oracle',
      data: labels.map(() => Math.random()*10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

function App() {
  let auth = useAuth();

  const [currency, setCurrency] = React.useState("SOL");

  const [tradeWait, setTradeWait] = React.useState(false);
  const [amount, setAmount] = React.useState(0);
  const [submitSuccess, setSubmitSuccess] = React.useState(null);


  let [countVal, setCountValue] = React.useState(null);

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

  function onChangeAmount(event){
    setAmount(event.target.value);
  }


  async function trade(){
    setTradeWait(true);
    try{
      await solana.incrementCounter(auth.user);
    }
    catch(err){
      console.log();
    }
    setTradeWait(false);
    setSubmitSuccess("ok");
  }

  return (
    <SmallContainer>
      <Typography component="h1" variant="h5" align='center'>
        Oracle Validation
      </Typography>

      <Typography component="h1" variant="subtitle1">
        Staked Asset:
      </Typography>

      <Grid container sx={{mb: "20px"}}>
        <Grid item xs={6}>
          <Typography component="h1" variant="subtitle1">
            20 SOL
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography component="h1" variant="subtitle1">
            100 USDC
          </Typography>
        </Grid>
      </Grid>

      
      
      <Line options={options} data={data}/>
      <Typography component="h1" variant="h6" align='center' color={"#0ecb81"}>
        {countVal}/1
      </Typography>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={currency}
        label="Age"
        onChange={(event) => {setCurrency(event.target.value)}}
      >
        <MenuItem value={"SOL"}>SOL</MenuItem>
        <MenuItem value={"USDC"}>USDC</MenuItem>
      </Select>

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label={currency}
        type="text"
        id="password"
        autoComplete="current-password"
        value={amount}
        onChange={onChangeAmount}
        // contentEditable="false"
      />

      {/* <Typography component="h1" variant="h5" align='center'>
        Arbitrage Oportunities
      </Typography> */}
      {/* <AlignItemsList /> */}


      {
        submitSuccess &&
        <Typography component="h1" variant="subtitle1" align='center' color={"#0ecb81"} sx={{margin: "10px"}}>
          Trade Succesfull, Gain: 10SOL
        </Typography>
      }
      

      <Grid container justifyContent="center">
        {tradeWait?
          <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton>   
          :
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 0, mb: 0, ml: 1 }}
            onClick={trade}
          >
            Trade
          </Button>

        }     
        
        
      </Grid>
      
    </SmallContainer>
  );
}

export function AlignItemsList() {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        disablePadding
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n`}
              src={`/static/images/binance.png`}
            />
          </ListItemAvatar>
          <ListItemText primary={`1.1X SOL`} />
        </ListItemButton>
      </ListItem>
    </List>
  );
}

export default App;
