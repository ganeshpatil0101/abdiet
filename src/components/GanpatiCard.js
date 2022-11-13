import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme) => ({
    root: {
    //   maxWidth: 415,
    //   minWidth: 415,
    [theme.breakpoints.up('xs')]: {
        maxWidth: 600,
        margin:'auto'
    },
      marginBottom: '10px',  
    },
    cardContent: {
      paddingTop: '10px',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingBottom: '0'
    },
    cardHeader: {
      padding: '10px'
    },
  }));
const GanpatiCard = ({id, mandalData, currentYear}) => {
    const classes = useStyles();
  return (
      <>
        {mandalData && mandalData.url &&  
        <Box m="auto" width={1}>
            <Card className={classes.root}>
            <CardHeader className={classes.cardHeader}
                title={mandalData.name}
                subheader={mandalData.area}
            />
            <img src={mandalData.url} 
            title={mandalData.name} loading="lazy" alt={mandalData.about} width="100%" height="100%" />
            <CardContent className={classes.cardContent} >
                <Typography variant="body2" color="textSecondary" component="span">
                    {mandalData.about}
                </Typography>
            </CardContent>
            </Card>
        </Box>
        }
    </>
  );
};

export default React.memo(GanpatiCard);
