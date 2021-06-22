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
    const [admin, setAdmin] = useState(false)
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
                if(data.user.isAdmin) setAdmin(true)
                setUser(data.user)
            } catch (e) {
                setAdmin(false)
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
                {auth && <Navigation admin={admin} logout={logout}/>}
                <Switch>
                    <Route path="/" exact>
                        {(!auth) ? <LandingPage setAuth={setAuth}/> : (!admin) ? <Dashboard setAuth={setAuth}/> : <AdminPage />}
                    </Route>
                    <PrivateRouter auth={auth} admin={admin} user={user} path="/dashboard" Component={Dashboard} exact/>
                    <PrivateRouter auth={auth} admin={admin} path="/garden" Component={Garden} exact/>
                    <PrivateRouter auth={auth} admin={admin} path="/florist" Component={Florist} exact/>
                    <PrivateRouter auth={auth} admin={admin} path="/admin" Component={AdminPage} exact/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

function PrivateRouter({auth, admin, Component, path, location, ...rest}) {
    return (
        <>
            {(!auth) ?
                <Redirect to={{
                    pathname: "/",
                    state: {from: location}
                }}/> :
                (!admin) ?
                <Route {...rest}>
                    <Component/>
                </Route> :
                    <Route {...rest}>
                        <AdminPage />
                    </Route>
            }
        </>
    )
}

export default App;
