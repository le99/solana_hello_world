import React from 'react';
import {useAuth} from '../auth/Auth';
import Navbar from '../navbar/Navbar';
import { Paper } from '@mui/material';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

function SmallContainer(props) {
  return (
    <React.Fragment>
      <Navbar />
      <Container component="main" maxWidth="xs" width={"100%"} 
        sx={{p: '0px', bgcolor: 'background.paper', marginTop:"10px"}}
      >
        <Paper elevation={1} sx={{p:"8px"}}>
          {props.children}
        </Paper>
      </Container>
    </React.Fragment>
  );
}

export default SmallContainer;

SmallContainer.propTypes = {
  children: PropTypes.node
};
