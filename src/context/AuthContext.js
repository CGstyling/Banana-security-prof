import {createContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import jwt_decode from 'jwt-decode';
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const history = useHistory();
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = jwt_decode(token);
            fetchUserData(decodedToken.sub, token);
        } else {
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: "done",
            });
        }
    },[])

    async function fetchUserData(id, token) {
        try {
            const result = await axios.get(`http://localhost:3000/600/users/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(result.data);
            toggleIsAuth({
                ...isAuth,
                isAuth: true,
                user: {
                    username: result.data.username,
                    email: result.data.email,
                    id: result.data.id,
                },
                status: "done",
            });
            history.push("/profile");
        }catch (e){
            console.error(e);
            toggleIsAuth({
                isAuth: false,
                user: null,
                status: 'done',
            });
        }
    }

    function signIn(JWT) {
        const decodedToken = jwt_decode(JWT);
        localStorage.setItem("token", JWT);
        fetchUserData(decodedToken.sub, JWT);
    }

    function signOut() {
        localStorage.clear();
        toggleIsAuth({
            isAuth: false,
            user: null,
            status: "done",
        });
        history.push("/");
        console.log("Gebruiker is uitgelogd");
    }

    const data = {
        isAuthenticated: isAuth.isAuth,
        user: isAuth.user,
        singInTrue: signIn,
        signInFalse: signOut,
    }

    return(
        <AuthContext.Provider value={data}>
            {isAuth.status === "done" ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;