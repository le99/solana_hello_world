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
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Oracle',
      data: labels.map(() => Math.random()*10),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const PROGRAM_ID = "4uWRvwKL9xzdxtfTBSYc7Eh3CjMeY9CAs7Db6wXnb72a";
const SOLANA_CLUSTER = "custom&customUrl=http%3A%2F%2Flocalhost%3A8899";

const PRIVATE_KEY = "0bf51a027c36bac4e0372e59e809a29273467ff69b996a82cd11a048edb33015a9f656a0a9ca129049780d1b8666ae0a90d4c332a40572bbaa2da8f5ce032cb1";

const fromHexString = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const toHexString = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


function App() {

  return (
    <SmallContainer>
      <Typography component="h1" variant="h5">
        Oracle Validation
      </Typography>

      <Line options={options} data={data} />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="SOL/USDC"
        type="text"
        id="password"
        autoComplete="current-password"
        value="10/2"
        // contentEditable="false"
      />

      <Typography component="h1" variant="h5">
        Arbitrage Oportunities
      </Typography>
      <AlignItemsList />
      <Grid container justifyContent="flex-end">        
        <Button
          color="error"
          type="submit"
          variant="contained"
          sx={{ mt: 0, mb: 0 }}
        >
          Reject
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 0, mb: 0, ml: 1 }}
        >
          Aprove
        </Button>

      </Grid>
      
    </SmallContainer>
  );
}

export function AlignItemsList() {
  return (
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <ListItem
        // secondaryAction={
        //   <Checkbox
        //     edge="end"
        //     // onChange={handleToggle(value)}
        //     // checked={checked.indexOf(value) !== -1}
        //     inputProps={{ 'aria-labelledby': labelId }}
        //   />
        // }
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
