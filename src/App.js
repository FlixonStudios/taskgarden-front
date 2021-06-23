import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {updateCoins} from "./store/actions/task.action";
// Components
import LandingPage from "./components/landing/LandingPage";
import Navigation from "./components/lib/Navigation";
import Dashboard from "./components/dashboard/Dashboard";
import Garden from "./components/garden/Garden";
import Florist from "./components/florist/Florist";
import AdminPage from "./components/admin/AdminPage";
import {getUser} from "./lib/checks";



function App() {
    const [auth, setAuth] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(null)

    let coins = useSelector(state => state.coins)
    const dispatch = useDispatch()

    useEffect(() => {
        //setAuth(isAuth())
        //setUserStats(setAuth, setUser, setAdmin)
        getUser().then(e => {
            if (e.user) {
                setAdmin(e.user.isAdmin)
                setAuth(true)
                setUser(e.user)
                dispatch(updateCoins(e.user.coins))
            } else {
                console.log(e.message)
            }
        })
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
                {auth && <Navigation user={user} admin={admin} coins={coins} logout={logout}/>}
                <Switch>
                    <Route path="/" exact>
                        {(!auth) ? <LandingPage setAuth={setAuth} setAdmin={setAdmin}/> : (!admin) ? <Dashboard setAuth={setAuth}/> : <AdminPage />}
                    </Route>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} user={user} path="/dashboard" Component={Dashboard} exact/>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} user={user} path="/garden" Component={Garden} exact/>
                    <PrivateRouter auth={auth} setAuth={setAuth} admin={admin} user={user} coins={coins} path="/florist" Component={Florist} exact/>
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
                        <Component auth={auth} {...rest}/>
                    </Route> :
                <Redirect to={{pathname: "/", state: {from: location}}}/>
            }
        </>
    )
}

export default App;
