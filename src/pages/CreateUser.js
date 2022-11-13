import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select, { SelectChangeEvent } from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import Link from '@material-ui/core/Link';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getFirebase, { getSecondaryFirebase } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import Error from '../components/Error';
import Loader from '../components/Loader';
import {getTimeInMs} from '../components/Handlers';
import { isEmpty } from 'lodash';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const CreateUser = () => {
    const classes = useStyles();
    const [fname, setFName] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [mobNo, setMobNo] = React.useState('');
  const [error, setError] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [age, setAge] = React.useState();
  const [vegNonveg, setVegNonveg] = React.useState('Veg');
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
//   const navigateTo = () => history.push('/addganpati');
    const auth = getAuth();
  const app = getFirebase();
  const db = getFirestore(app);
  const userCollection = collection(db, "users");
  // const sec = getSecondaryFirebase();
  function checkForValidation() {
    setError('')
    if(isEmpty(fname)) {
      setError('Enter Patient Name');
      return false;
    }
    if(isEmpty(mobNo)) {
      setError('Enter Mobile Number');
      return false;
    }
    if(!isEmpty(mobNo) && mobNo.length < 10) {
      setError('Enter Valid Mobile Number');
      return false;
    }
    if(isEmpty(weight)) {
      setError('Enter Weight');
      return false;
    }
    if(isEmpty(age)) {
      setError('Enter Age');
      return false;
    }
    return true;
  }
  function onSubmit(event) {
    event.preventDefault();
    console.log(fname, mobNo, weight, address);
    // https://firebase.google.com/docs/database/web/read-and-write
    if(checkForValidation()) {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, `${mobNo}@gmail.com`, `${mobNo}`)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const userData = {
            uid: user.uid,
            pName: fname,
            mobNo,
            weight,
            address,
            createdOn : getTimeInMs(),
            isActive: true,
            isDeleted: false,
            age,
            data:[],
            vegNonveg,
          };
            addDoc(userCollection, userData)
            .then((data) => {
                alert('New User Created!');
              return data;
            }).then(() => {
              signOut(auth).then(()=>{
                console.log('User Logged in success fully ');
                setIsLoading(false);
                history.push('/');
              });
            })
          })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setError(errorMessage);
          setIsLoading(false);
          // ..
        });
    }
    return false;
  }
  const handleChange = (event) => {
    setVegNonveg(event.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading && <Loader />}
      {!isLoading && <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Create User
        </Typography>
        {error && <Error errorMessage={error} />}
        <form className={classes.form} noValidate method="post" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="name"
            label="Patient Name"
            name="fname"
            autoFocus
            value={fname}
            onChange={(event)=> setFName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="mobNo"
            label="Mobile No."
            name="mobNo"
            value={mobNo}
            onChange={(event)=> setMobNo(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="weight"
            label="weight"
            name="weight"
            value={weight}
            onChange={(event)=> setWeight(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="age"
            label="age"
            name="Age"
            value={age}
            onChange={(event)=> setAge(event.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="veg-nonveg">Veg/Non-Veg</InputLabel>
            <Select
              labelId="veg-nonveg"
              id="veg-nonveg-select"
              value={vegNonveg}
              label="Veg-NonVeg"
              onChange={handleChange}
            >
              <MenuItem value={'Veg'}>Veg</MenuItem>
              <MenuItem value={'NonVeg'}>Non-Veg</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="address"
            label="address"
            name="address"
            value={address}
            multiline={true}
            maxRows='4'
            minRows='2'
            onChange={(event)=> setAddress(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >Save</Button>
        </form>
      </div>}
    </Container>
  );
};

export default CreateUser;