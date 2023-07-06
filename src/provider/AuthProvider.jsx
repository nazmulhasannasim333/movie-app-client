import axios from "axios";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import React, { createContext, useEffect, useState } from 'react';
import app from "../firebase/firebase.config";


export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
     }
     const loginUser = (email, password) => {
        setLoading(true);
         return signInWithEmailAndPassword(auth, email, password)
     }
 
     const profileUpdate = (name) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name
         })
     }
 
     useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
          setUser(currentUser)
          setLoading(false);
          if(currentUser){
            axios.post(`http://localhost:5000/jwt`, {email: currentUser.email})
            .then(data => {
                localStorage.setItem("access-token", data.data.token)
                setLoading(false);
            })
          }
          else{
            localStorage.removeItem("access-token")
          }
         
         })
         return () => {
             unsubscribe()
         }
     },[])
 
     const logout = () => {
        setLoading(true);
        return signOut(auth);
     }

     const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
     }


const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    profileUpdate,
    logout,
    googleLogin,
    
}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;