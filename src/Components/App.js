import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "../Context/UserContext";
import Home from "./Home";
import Login from "./Login";
import Plan from "./Plan";
import Register from "./Register";
import Subscription from "./Subscription";
import Update from "./Update";
import Users from "./Users";


export default function App(){
    const [user, setUser] = useState("")

    return (
    <UserContext.Provider value={{user, setUser}}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/sign-up" element={<Register/>}/>
                <Route path="/subscriptions" element={<Subscription/>}/>
                <Route path="/subscriptions/:ID_DO_PLANO" element={<Plan/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/users/:ID_DO_USUARIO" element={<Users/>}/>
                <Route path="/users/:ID_DO_USUARIO/:update" element={<Update/>}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>)
}