import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import App from './App';
import Contacts from "./components/Contacts/Contacts";
import AddContact from "./components/Contacts/AddContact";
import EditContact from "./components/Contacts/EditContact";
import ViewContact from "./components/Contacts/ViewContact";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter basename="/React-Contact-Manager">
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Route>
                <Route path="*" element={
                    <main style={{width: "25%", margin: "0 auto"}}>
                        <img style={{width: "100%"}} src={require("./assets/404.gif")} alt="404 error"/>
                    </main>
                }/>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
