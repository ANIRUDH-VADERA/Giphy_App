import React,{useEffect,useState} from "react";
import axios from "axios";
import Loader from "./Loader.js";
import Paginate from "./Paginate.js";

const Giphy = () => {
    
    const [Giphs,setData] = useState([]);
    const [isPending,setPending] = useState(true);
    const [isError,setError ] = useState(false);
    const [search,setSearch] = useState("");
    const [currentPage,setCurrentPage] = useState(1);
    const [itemPerPage,setItemsPerPage] = useState(25);
    const indexLastItem = currentPage*itemPerPage;
    const indexFirstItem = indexLastItem - itemPerPage;
    const currentItems = Giphs.slice(indexFirstItem,indexLastItem);

    useEffect(()=>{
        const fetchData = async () =>
        {
            setError(false);
            try 
            {
                const results = await axios("https://api.giphy.com/v1/gifs/trending",{
                    params : {
                        limit : 200,
                        api_key : "1Klt5fnosbU14KIGz360fXwc1RQD4N3B"
                    }
                });                
                console.log(results);
                setData(results.data.data);
                setPending(false);

            }
            catch(err)
            {
                setPending(false);
                setError(true);
                console.log(err);
            }
        }

        fetchData();

    },[])
    
    const renderGifs = ()=>{
        
        if(isPending)
        {
            return(
                    <Loader />
                )
        }
        
        return currentItems.map((item)=>{
            return(
                <div key = {item.id} className="gif">
                    <img alt = "gif" src={item.images.fixed_height.url} />
                </div>
            )
        })
    }
    const renderError = ()=>{
        if(isError)
        {
            return(
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    Unable to get Gifs,Please try in some time
                </div>
            )
        }
    }

    const searchChange = (event)=>{  
        setSearch(event.target.value);
    }

    const handleClick = (event)=>{
        event.preventDefault();
        const fetchData = async () =>
        {
            setError(false);
            try 
            {
                const results = await axios("https://api.giphy.com/v1/gifs/search",{
                    params : {
                        api_key : "1Klt5fnosbU14KIGz360fXwc1RQD4N3B",
                        q : search,
                        limit : 200
                    }
                });                
                console.log(results);
                setData(results.data.data);
                setPending(false);

            }
            catch(err)
            {
                setPending(false);
                setError(true);
                console.log(err);
            }
        }
        setSearch("");
        fetchData();
    }

    const pageSelected = (pageNumber)=>{
        console.log("hi");
        setCurrentPage(pageNumber);
    }

    return(
        <div className="m-2">
            {renderError()}
            <form className="form-inline justify-content-center m-2 formmy">
                <input type="text" placeholder="Search" className="form-control" onChange={searchChange} value={search}></input>
                <button onClick = {handleClick} type="submit" className="btn btn-primary mx-2">Go</button>
            </form>
            <Paginate 
                pageSelected = {pageSelected}
                currentPage = {currentPage}
                itemPerPage = {itemPerPage}
                totalItems = {Giphs.length}
            />
            <div className="container gifs">{renderGifs()}</div>
        </div>
    )

}
 
export default Giphy;