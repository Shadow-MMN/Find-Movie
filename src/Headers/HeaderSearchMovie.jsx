import React from 'react'
import { NavLink } from 'react-router-dom'
import SearchMovies from '../SearchMovieForm'
export default function HeaderSearchMovie(){
    return (
        <>
        <header>
            <h1 className='text-4xl'>Find your film</h1>
            <NavLink to="/watchlist" className='ml-auto no-underline capitalize mr-4 text-md text-slate-900 hover:text-slate-100 hover:bg-slate-900 mb-4 p-2 rounded-full bg-slate-100'>My Watchlist</NavLink>
        </header>
        <SearchMovies/>
        </>
    )
} 