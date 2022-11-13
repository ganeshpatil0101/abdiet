import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
export default function Loader() {
  const classes = useStyles();

  return (
    <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100%"
        backgroundcolor="#d4d4d4">
        <div className={classes.root}>
        <CircularProgress />
        </div>
    </Box>
  );
}
