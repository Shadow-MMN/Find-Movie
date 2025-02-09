import React from 'react'
import { NavLink } from 'react-router-dom'
import Watchlist from '../Search-movies/Watchlist'
export default function HeaderWatchlist(){
    return (
        <>
         <header >
            <h1 className='text-4xl'>My Watchlist</h1>
            <NavLink to=".." relative='path' className='ml-auto no-underline capitalize mr-4 text-md text-slate-900 hover:text-slate-100 hover:bg-slate-900 mb-4 p-2 rounded-full bg-slate-100'>Search for movies </NavLink>
        </header>
            <main className='flex flex-col items-center w-11/12 lg:w-7/12 mx-auto gap-y-4'>
                <Watchlist/>
            </main>
        </>
    )
} 