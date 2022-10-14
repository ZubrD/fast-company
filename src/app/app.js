import React from "react";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import Users from "./components/users";
import UserCard from "./components/userCard";
import Login from "./components/login";
import Main from "./components/main";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={UserCard} />
                <Route path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
