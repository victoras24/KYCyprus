import React from 'react'
import Layout from "./components/Layout"
import Search from "./pages/Search"
import './styles/index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Search />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}