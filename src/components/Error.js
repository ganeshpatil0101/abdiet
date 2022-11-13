import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    error: {
      color: 'red'
    }
}));

const Error = ({errorMessage}) => {
  const classes = useStyles();
  return (
    <span className={classes.error}>{errorMessage}</span>
  );
};

export default Error;
