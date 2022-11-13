import {useState, useEffect} from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default function useLogin() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        setIsLoading(true);
          onAuthStateChanged(auth, (authUser) => {
            setIsLoading(false);
            if (authUser) {
                setUser(authUser);
                setIsUserLoggedIn(true);
            } else {
                setIsUserLoggedIn(false);
                setIsUserLoggedIn(null);
            }
          });
      }, []);

    function signIn(username, password) {
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, username, password).then((user)=>{
            console.log("user", user);
            setIsLoading(false);
            setUser(user);
            setIsUserLoggedIn(true);
            return user;
          }).catch(e => {
            setIsLoading(false);
            setIsUserLoggedIn(false);
          });
    }
    
    function createUser() {

    }

    function logout() {
        return signOut(auth);
    }

    return {
        isLoading,
        isUserLoggedIn,
        user,
        signIn,
        logout,
        createUser
    }
}

