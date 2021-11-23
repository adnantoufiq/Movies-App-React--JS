import React,{useState,useEffect} from "react";
import Movie from "./Components/Movie";

const FEATURED_API =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCH_API =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


function App() {
  const [movies , setMovies] = useState([])
  const [searchTerm , setSearchTerm] = useState('');

  useEffect(() => {
    
      fetch(FEATURED_API)
      .then((resp)=>resp.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results)})

  }, [])

  const handleOnSubmit = (e) =>{  
    e.preventDefault()

    if(searchTerm){

    
    fetch(SEARCH_API + searchTerm)
      .then((resp)=>resp.json())
      .then((data)=>{
        console.log(data);
        setMovies(data.results)})

        setSearchTerm(' ')
      }
}

  const handleOnChange =(e)=>{
    setSearchTerm(e.target.value)
  }

  return (
      <>
      <form onSubmit={handleOnSubmit}>
      <header >
          <input className="search" type="search" placeholder="search.." value={searchTerm} onChange={handleOnChange} />
        </header>
      </form>
       
          <div className="movie-container">
            
              {  movies.map(movie =>(
                <Movie key={movie.id}  {...movie} />          
              ))}
          </div>
      </>
    );
}

export default App;
