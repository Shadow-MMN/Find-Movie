import React, { useEffect, useState } from "react";

export default function SearchMovie({ movie }) {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!movie) return;

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        // First, search for movies using the search query.
        const res = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=14f1307`);
        const data = await res.json();

        // Check if the search was successful
        if (data.Response === "True") {
          // data.Search is an array with minimal movie info.
          // Map over each movie to fetch its detailed info using its imdbID.
          const detailedMovies = await Promise.all(
            data.Search.map(async (movieItem) => {
              const detailRes = await fetch(`https://www.omdbapi.com/?i=${movieItem.imdbID}&apikey=14f1307`);
              const detailData = await detailRes.json();
              return detailData;
            })
          );
          setMovies(detailedMovies);
          setErrorMessage(null);
        } else {
          // Handle cases where no movies were found.
          setMovies(null);
          setErrorMessage("No movies found. Try another search.");
        }
      } catch (err) {
        console.error(err);
        setMovies(null);
        setErrorMessage("Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    // Call the async function
    fetchMovies();
  }, [movie]);
  
  // Event handler for clicks
  const addToWatchlist = (e) => {
    const movieId = e.target.dataset.id; // Get the movie's unique ID
  
    // Find the movie in the list (assuming `movies` is an array of movies)
    const selectedMovie = movies.find((movie) => movie.imdbID === movieId);
  
    if (selectedMovie) {
      // 1️⃣ Get existing watchlist from localStorage (or set an empty array if it's empty)
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
      // 2️⃣ Check if the movie is already in the watchlist to avoid duplicates
      if (!watchlist.some((movie) => movie.imdbID === selectedMovie.imdbID)) {
        watchlist.push(selectedMovie); // 3️⃣ Add the new movie
        localStorage.setItem("watchlist", JSON.stringify(watchlist)); // 4️⃣ Save back to localStorage
        alert(`Movie added to watchlist: ${selectedMovie.Title}`);
      } else {
        alert(`"${selectedMovie.Title}" is already in the watchlist!`);
      }
    }
  };
  
    console.log()
    const moviesEl = movies? 
    movies.map(show =>{
        return(
         
                 <div key={show.imdbID} className="border-b border-slate-500 flex w-auto sm:w-1/2 text-white py-4">
                    <img src={`${show.Poster}`} alt={`A poster of the movie ${show.Title}`} className="w-[100px]" />
                    <section className="flex flex-col ml-4 gap-4 w-full">
                      <div className="flex items-center gap-2">
                          <h3 className="text-xl">{show.Title}</h3>
                          <i className="fa-solid fa-star text-yellow-400"></i>
                          <p>{show.imdbRating}</p>
                      </div>
                      <div className="flex justify-between text-[10px] md:text-xs gap-2 items-center">
                          <p>{show.Runtime}</p>
                          <p>{show.Genre}</p>
                          <button data-id={show.imdbID} onClick={addToWatchlist} className="flex items-center text-yellow-900 hover:text-yellow-100 hover:bg-yellow-900 px-2 rounded-xl bg-yellow-100"><i className="fa-solid fa-circle-plus text-lg mr-1"></i>Watchlist</button>
                      </div>
                      <div>
                          <p className="line-clamp-4 text-slate-300">{show.Plot}</p>
                      </div>
                    </section>
                </div>
            
        )
    }) 
    :<>
        <div className='text-white flex flex-col items-center justify-center h-96 '>
             <i className="fa-solid fa-film text-6xl"></i>
             <h2 className='text-xl'>{errorMessage}</h2>
        </div>
    </>
    return(
       <>
       {isLoading?
        <div className='text-white flex flex-col items-center justify-center h-96 '>
          <i className="fa-solid fa-film text-6xl"></i>
          <h2 className='text-3xl'>Loading...</h2>
        </div>
       : moviesEl }
       </>
    )
}

