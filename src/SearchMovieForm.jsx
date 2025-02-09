import React,{ useState,useRef } from 'react'
import SearchMovie from './Search-movies/SearchMovie';

export default function SearchMoviesForm(){
    const [movie,setMovie] = useState(undefined)
    const formRef = useRef(null)

  const handleSubmit = (event) => {
    event.preventDefault(); 
    const formData = new FormData(formRef.current);

   
    const data = Object.fromEntries(formData.entries());
    setMovie(data.movie)
  };
    return (
        <>
           <section className='w-screen flex flex-col items-center '>
                <form ref={formRef} onSubmit={handleSubmit} className='flex relative bottom-4 w-1/2'>
                    <input type="text" name='movie' placeholder='Search movie' className='text-slate-100 focus:text-slate-900 focus:bg-slate-100 bg-slate-900 rounded-l-xl p-2 sm:pl-4 sm:text-lg w-8/12 sm:w-10/12' />
                    <button type='submit' className='text-md text-slate-900 hover:text-slate-100 hover:bg-slate-900 p-2 rounded-r-xl bg-slate-100 sm:text-lg w-4/12 sm:w-2/12'>Search</button>
                </form>
            </section>
        
           {
                movie?
                    <main className='flex flex-col items-center w-11/12 lg:w-7/12 mx-auto gap-y-4'>
                         <SearchMovie movie={movie}/>
                    </main>
                :<div className='text-white flex flex-col items-center justify-center h-96 '>
                    <i className="fa-solid fa-film text-6xl"></i>
                    <h2 className='text-3xl'>Start Exploring</h2>
                 </div>
            } 
          
            
        </>
    )
}

{/* <div>
<i className="fa-solid fa-film"></i>
<h2>Start Exploring</h2>
</div>  */}