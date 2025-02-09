import { useState } from 'react'
import Layout from './Headers/Layout'
import HeaderSearchMovie from './Headers/HeaderSearchMovie.jsx'
import HeaderWatchlist from './Headers/HeaderWatchlist.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App() { 
 

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<HeaderSearchMovie/>}/>
          <Route path='/watchlist' element={<HeaderWatchlist/>} />
          <Route/>
        </Route>
      </Routes>
    </Router>
  )
}

