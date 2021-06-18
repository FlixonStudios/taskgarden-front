import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
// Components
import LandingPage from "./components/landing/LandingPage";
import Navigation from "./components/lib/Navigation";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
    console.log(window.location.pathname)
    return (
        <div className="App">
            <BrowserRouter>
                {window.location.pathname !== "/" && <Navigation/>}
                <Switch>
                    <Route path="/" exact>
                        <LandingPage />
                    </Route>
                    <Route path="/dashboard" exact>
                        <Dashboard  />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
