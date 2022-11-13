import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import getFirebase from '../firebase-config';
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import Error from '../components/Error';
import Loader from '../components/Loader';
import { getTimeInMs } from '../components/Handlers';
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

function Register({onSuccess, onError, currentUser}) {
  const classes = useStyles();
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const [regNo, setRegNo] = React.useState('');
  const [mobNo, setMobNo] = React.useState('');
  const [error, setError] = React.useState('');
  const [area, setArea] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const navigateTo = () => history.push('/addganpati');
  const app = getFirebase();
  const db = getFirestore(app);
  const mandalCollection = collection(db, "mandal");
  function onSubmit(event) {
    event.preventDefault();
    if (name && mobNo) {
      setError('');
        setIsLoading(true);
        setError('');
        try{
          addDoc(mandalCollection, {
                'name': name,
                'regNo': regNo,
                'mobNo': mobNo,
                'area': area,
                'about': about,
                'createdOn' : getTimeInMs(),
          })
          .then((data) => {
              console.log('success ', data);
              onSuccess();
              resetFields();
              setIsLoading(false);
              alert('Saved!');
          })
          .catch((error) => {
              console.error("Error writing document: ", error);
              setError(error.message);
              setIsLoading(false);
          });
        } catch (e) {
          console.error(e);
        }
    } else {
      setError('Please enter name and mobile');
    }
    return false;
  }
  const resetFields = () => {
    setName('');
    setRegNo('');
    setMobNo('');
    setAbout('');
    setArea('');
  }
  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log('logout success ');
    }).catch((error) => {
      console.error('error while logout ', error);
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {isLoading && <Loader />}
      {!isLoading && <div className={classes.paper}>
        {currentUser && currentUser.email && <Typography variant="caption" display="block" gutterBottom>
          {currentUser.email}
          <span onClick={logOut}> Logout </span>
        </Typography>}
        <Avatar className={classes.avatar}>
          <AddOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            मंडळ रेजिस्ट्रेशन
        </Typography>
        {error && <Error errorMessage={error} />}
        <form className={classes.form} noValidate method="post" onSubmit={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="name"
            label="मंडळाचे नाव"
            name="name"
            autoFocus
            value={name}
            onChange={(event)=> setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="regNo"
            label="मंडळ रजिस्टर नंबर"
            name="regNo"
            value={regNo}
            onChange={(event)=> setRegNo(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id="mobNo"
            label="मोबाईल नंबर"
            name="mobNo"
            value={mobNo}
            onChange={(event)=> setMobNo(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required={true}
            fullWidth
            id="area"
            label="ठिकाण"
            name="area"
            value={area}
            onChange={(event)=> setArea(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="about"
            label="मंडळाविषयी"
            name="about"
            value={about}
            multiline={true}
            maxRows='4'
            minRows='2'
            onChange={(event)=> setAbout(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Save
          </Button>
          <Link
            component="button"
            variant="body2"
            onClick={navigateTo}
            > Add Ganpati Image Url </Link>
        </form>
      </div>}
    </Container>
  );
}
Register.propTypes = {
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  currentUser: PropTypes.object,
};
export default Register;