import React,{useState, createContext} from 'react';
import axios from 'axios';
const EntertainContext = createContext();

export const EntertainProvider = ({children}) => {

    const [trending, setTrending] = useState([]);
    const [movies, setMovies] = useState([]);
    const [tvShowes, setTVShowes] = useState([]);
    const [detail,setDetail] = useState();
    const [videos, setVideos] = useState([]);
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchTrendingData = async () => {
        try{
            const response =  await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=7a6eb72a45fd621fa981631b9589959b");
            const data = response.data.results;
            console.log(data);
            setTrending(data);
            setIsLoading(false);
        } catch(error){
            console.log(error.message);
        }
    } 

    const fetchMovies = async () => {
        try{
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular?api_key=7a6eb72a45fd621fa981631b9589959b&language=en-US&page=1");
            const data = response.data.results;
            console.log(data);
            setMovies(data);
            setIsLoading(false);
        } catch(error){
            console.log(error.message);
        }
    }

    const fetchTvShowes = async () => {
        try{
            const response =  await axios.get("https://api.themoviedb.org/3/tv/popular?api_key=7a6eb72a45fd621fa981631b9589959b&language=en-US&page=1");
            const data = response.data.results;
            console.log(data);
            setTVShowes(data);
            setIsLoading(false);
        } catch(error){
            console.log(error.message);
        }
    }



    const fetchDetail = async (id, type) => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}?api_key=7a6eb72a45fd621fa981631b9589959b&language=en-US`)
            const data = response.data;
            console.log(data);
            setDetail(data);
        } catch(error){
            console.log(error.message);
        }
    }

    const fetchVideos = async (id, type) => {
        try{
            const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=7a6eb72a45fd621fa981631b9589959b&language=en-US`)
            const data = response.data.results;
            console.log(data);
            setVideos(data);

        } catch(error){
            console.log(error.message);
        }
    }
    

    return(
        <EntertainContext.Provider
        value={{
            trending,
            setTrending,
            fetchTrendingData,
            movies,
            setMovies,
            fetchMovies,
            tvShowes,
            setTVShowes,
            fetchTvShowes,
            isLoading,
            setIsLoading,
            videos,
            fetchVideos,
            detail,
            fetchDetail
        }}
        >
            {children}
        </EntertainContext.Provider>
    )
}

export default EntertainContext;