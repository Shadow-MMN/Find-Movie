import React,{useEffect,useState} from "react";



export default function Watchlist(){
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
      // Retrieve saved movies from localStorage
      const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      setWatchlist(storedWatchlist);
    }, []);
    const removeFromWatchlist = (e) => {
        // Get the movie id from the button's data attribute
        const movieId = e.currentTarget.dataset.id;
        
        // Find the movie object that is going to be removed
        const movieToRemove = watchlist.find(movie => movie.imdbID === movieId);
        
        // Filter out the movie from the watchlist
        const updatedWatchlist = watchlist.filter(movie => movie.imdbID !== movieId);
        
        // Update state and localStorage with the new watchlist
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
        
        // Log the movie's title instead of its id
        if (movieToRemove) {
          alert(`Removing ${movieToRemove.Title} from watchlist`);
        }
      };
      
    const watchlistEl =  watchlist.length > 0 ? watchlist.map(movie =>{
        return(
            <div key={movie.imdbID} className="border-b border-slate-500 flex w-auto sm:w-1/2 text-white py-4">
                    <img src={`${movie.Poster}`} alt={`A poster of the movie ${movie.Title}`} className="w-[100px]" />
                    <section className="flex flex-col ml-4 gap-4 w-full">
                      <div className="flex items-center gap-2">
                          <h3 className="text-xl">{movie.Title}</h3>
                          <i className="fa-solid fa-star text-yellow-400"></i>
                          <p>{movie.imdbRating}</p>
                      </div>
                      <div className="flex justify-between text-[10px] md:text-xs gap-2 items-center">
                          <p>{movie.Runtime}</p>
                          <p>{movie.Genre}</p>
                          <button data-id={movie.imdbID} onClick={removeFromWatchlist} className="flex items-center text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900 px-2 rounded-xl bg-yellow-100"><i className="fa-solid fa-circle-minus text-lg mr-1"></i>Remove</button>
                      </div>
                      <div>
                          <p className="line-clamp-4 text-slate-300">{movie.Plot}</p>
                      </div>
                    </section>
            </div>
        )
    }):<div className='text-white flex flex-col items-center justify-center h-96 '>
            <i className="fa-solid fa-film text-6xl"></i>
            <h2 className='text-3xl'>Add Movies to Watchlist</h2>
        </div>

    return <>{watchlistEl}</>;

}