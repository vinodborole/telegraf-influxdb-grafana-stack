import {
  BrowserRouter,
  Router,
  Switch,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Navbar from "./components/Navbar/Navbar";
import BenchmarkGraph from "./components/BenchmarkGraphs/BenchmarkGraph";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import ViewUsers from "./components/keyCloakActions/Users/ViewUsers";
import ViewGroups from "./components/keyCloakActions/Groups/ViewGroups";
import ViewRoles from "./components/keyCloakActions/Roles/ViewRoles";
import LoginAdmin from "./components/Authentication/LoginAdmin";
import { useSelector } from "react-redux";
import { selectComponent } from "./components/store/store";

function App() {
  const isLogin = useSelector(selectComponent);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={LoginAdmin} />
        <Route exact path="/login" Component={LoginAdmin} />

        <Route exact path="/Register" Component={Register} />
        {isLogin.login ? (
          <Route exact path="/Homepage" Component={Homepage}>
            <Route exact path="/Homepage/Graphs" Component={BenchmarkGraph} />
            <Route exact path="/Homepage/Users" Component={ViewUsers} />
            <Route exact path="/Homepage/Roles" Component={ViewRoles} />
            <Route exact path="/Homepage/Groups" Component={ViewGroups} />
          </Route>
        ):(<Route path="*" element={<Navigate to="/"/>}/>)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
