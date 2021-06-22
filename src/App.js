import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
// Components
import LandingPage from "./components/landing/LandingPage";
import Navigation from "./components/lib/Navigation";
import Dashboard from "./components/dashboard/Dashboard";
import Garden from "./components/garden/Garden";
import Florist from "./components/florist/Florist";
import AdminPage from "./components/admin/AdminPage";
import {isAuth, setUserStats, getUser} from "./lib/checks";


function App() {
    const [auth, setAuth] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        //setAuth(isAuth())
        //setUserStats(setAuth, setUser, setAdmin)
        getUser().then(user =>{
            setAdmin(user.isAdmin)
            setAuth(true)
            setUser(user)
        }).catch(err =>{
            console.log(err)
        })
        console.log(auth)
    }, [])

    async function logout() {
        try{
            setAdmin(false)
            setAuth(false)
            setUser(null)
            await axios.delete("/api/logout", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            localStorage.removeItem("token")
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                {auth && <Navigation user={user} admin={admin} logout={logout}/>}
                <Switch>
                    <Route path="/" exact>
                        {(!auth) ? <LandingPage setAuth={setAuth} setAdmin={setAdmin}/> : (!admin) ? <Dashboard setAuth={setAuth}/> : <AdminPage />}
                    </Route>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} user={user} path="/dashboard" Component={Dashboard} exact/>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} path="/garden" Component={Garden} exact/>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} path="/florist" Component={Florist} exact/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

function PrivateRouter({auth, admin, Component, path, location, ...rest}) {
    return (
        <>
            {(auth && !admin) ?
                    <Route path={path} exact>
                        <Component {...rest}/>
                    </Route> :
                <Redirect to={{pathname: "/", state: {from: location}}}/>
            }
        </>
    )
}

export default App;
