import React, { createContext, useEffect, useState } from "react"
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth"
import auth from "../../firebase/firebase.config"
import PropTypes from "prop-types"
import Loading from "../../components/Loading/Loading"
import axios from "axios"

export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // sign in with google
    const googleSignIn = () => {
        // setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // create user
    const createUser = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // login user
    const loginUser = (email, password) => {
        // setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // update user info
    const updateUserData = (name, photo) => {
        // setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo,
        })
    }

    // logout user
    const logoutUser = () => {
        setLoading(false)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
            const userEmail = currentUser?.email || user?.email || ""
            const loggedUser = { userEmail }
            if (currentUser) {
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, loggedUser, { withCredentials: true }).then((res) => {
                    console.log(res.data)
                })
            } else {
                axios.post(`${import.meta.env.VITE_API_URL}/logout`, loggedUser, { withCredentials: true }).then((res) => {
                    console.log(res.data)
                })
            }
        })
        return () => unSubscribe()
    }, [user?.email])

    const AuthData = { user, loading, createUser, googleSignIn, logoutUser, loginUser, setUser, updateUserData }
    if (loading) return <Loading status={true}></Loading>
    return <AuthContext.Provider value={AuthData}>{children}</AuthContext.Provider>
}

export default AuthProvider

AuthProvider.propTypes = {
    children: PropTypes.node,
}
