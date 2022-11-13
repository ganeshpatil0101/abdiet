import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from "@material-ui/core/Box";
import { LinearProgress, Typography } from "@material-ui/core";
import { useRef } from 'react';
import { Redirect } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));
const NoData = ({year}) => {
  const classes = useStyles();
  const previousYear = useRef(parseInt(year, 10) - 1);
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [redirect, setRedirect] = React.useState(false);
  const timer = useRef();

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        clearInterval(timer.current);
        setRedirect(true);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    timer.current = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return (
    <>
    <Box 
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        minWidth="100%"
        flexDirection="column"
        backgroundcolor="#d4d4d4">
        <div className={classes.root}>
            <Typography variant="h6" gutterBottom>
                {year} या वर्षाचा डेटा उपलब्द नाही. {previousYear.current} चा डेटा दाखवत आहे. 
            </Typography>
            
        </div>
        <div style={{width:'80%'}} >
              <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />    
            </div>
       
        {redirect && <Redirect to={{
                pathname:`/photo/${previousYear.current}`,
                state:{ year:previousYear.current },
              }} /> }
    </Box>
    </>
  );
}

export default React.memo(NoData);