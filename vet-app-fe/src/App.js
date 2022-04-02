import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import MenuBar from "./components/MenuBar";
import NewUser from "./pages/NewUser";
import ModifyUser from "./pages/ModifyUser";
import AnimalForm from "./pages/AnimalForm";
import AnimalProfile from "./components/AnimalProfile";
import AnimalList from "./components/AnimalList";
import ProtectedRoute from "./authentication/ProtectedRoute";

function App() {
  return (
    <div>
      <MenuBar />
      <Switch>
        <main>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login">
            <Login />
          </Route>

          <Route path="/welcome" component={Welcome} />
          <ProtectedRoute path="/users" exact component={Users} />
          <ProtectedRoute path="/users/new" component={NewUser} />
          <ProtectedRoute path="/users/modify" component={ModifyUser} />
          <ProtectedRoute path="/animal/create" component={AnimalForm} />
          <ProtectedRoute path="/animal-profile" component={AnimalProfile} />
          <ProtectedRoute path="/animal-list" component={AnimalList} />
          <Route path="/404">
            <NotFound />
          </Route>
        </main>
      </Switch>
    </div>
  );
}

export default App;
