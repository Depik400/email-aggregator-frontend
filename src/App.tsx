import React, {useContext, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import { RouterProvider } from 'react-router-dom';
import Router from './routes';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
    const {auth} = useContext(Context)
    useEffect(() => {
        auth.refresh();
    })
    return (
        <div className="App">
            <div className="App-header">
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={Router}></RouterProvider>
                </QueryClientProvider>
            </div>
        </div>
    );
}

export default observer(App);
