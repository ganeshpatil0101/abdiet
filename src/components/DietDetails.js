import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MealItem from './MealItem';


const useStyles = makeStyles((theme) => ({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
}));

const DietDetails = ({dietData, onEdit, isAssign}) => {
    const classes = useStyles();
    return (
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{dietData.dName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
              <MealItem dietData={dietData} />
          </AccordionDetails>
          <AccordionActions>
            <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => onEdit(dietData)}
              > { (isAssign) ? 'Assign Diet' : 'Edit Diet Master' }</Button>
          </AccordionActions>
        </Accordion>
    )
  }
  export default React.memo(DietDetails);