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

function App() {
    const [auth, setAuth] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function setUserStats() {
            try {
                let {data} = await axios.get("/api/user", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setAuth(true)
                setUser(data.user)
            } catch (e) {
                setAuth(false)
                setUser(null)
                await axios.delete("/api/logout", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                localStorage.removeItem("token")
            }
        }

        setUserStats()
    }, [auth])

    async function logout() {
        try{
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
                {auth && <Navigation logout={logout}/>}
                <Switch>
                    <Route path="/admin" >
                        <AdminPage/>
                    </Route>
                    <Route path="/" exact>
                        {!auth ? <LandingPage setAuth={setAuth}/> : <Dashboard setAuth={setAuth}/>}
                    </Route>
                    <PrivateRouter auth={auth} user={user} path="/dashboard" Component={Dashboard} exact/>
                    <PrivateRouter auth={auth} path="/garden" Component={Garden} exact/>
                    <PrivateRouter auth={auth} path="/florist" Component={Florist} exact/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

function PrivateRouter({auth, Component, path, location, ...rest}) {
    //if auth is true then show Route else redirect to login
    return (
        <>
            {(auth) ?
                <Route {...rest}>
                    <Component/>
                </Route> : <Redirect to={{
                    pathname: "/",
                    state: {from: location}
                }}/>
            }
        </>
    )
}

export default App;
