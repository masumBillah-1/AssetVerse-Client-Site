import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';


const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {


    const [user , setUser] = useState(null)
    const [loading , setLoading] = useState(true)


    const registerUser = (email,password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser = (email,password)=> {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }


    const signInGoogle = ()=> {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }

    const forgetPassword = (email)=> {
            return sendPasswordResetEmail(auth, email)
        }



    const logOut =()=> {
        setLoading(true)
       return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            setLoading(false)
            // console.log(currentUser)
        })
        return ()=> {
            unSubscribe()
        } 
            
    },[])



    const authInfo = {
        user,
        loading,
        registerUser,
        signInUser,
        signInGoogle,
        logOut,
        forgetPassword 


    }

    return (
        <AuthContext value={authInfo}>
            {children}
            
        </AuthContext>
    );
};

export default AuthProvider;