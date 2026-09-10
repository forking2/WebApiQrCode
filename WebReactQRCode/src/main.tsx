import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ReactQueryProvider from './providers/ReactQueryProvider.tsx'
import {BrowserRouter} from "react-router";
import {AuthProvider} from "./context/AuthContext.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ReactQueryProvider>
            <AuthProvider>
                <GoogleOAuthProvider clientId={"64413322020-fplj45jcldha3k75qkg46ab6cgvs7g8o.apps.googleusercontent.com"}>
                    <BrowserRouter>
                        <App />
                    </BrowserRouter>
                </GoogleOAuthProvider>
            </AuthProvider>
        </ReactQueryProvider>
    </StrictMode>,
)