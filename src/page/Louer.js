import React, {useState, useEffect} from 'react';
import Sidebar from './component/Sidebar';
import './css/Style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import search from './img/search.png';
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';

function Louer() {

    const [data, setData] = useState([]);
    const [searchBar, setSearchBar] = useState('');
  
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/louer/get");
        setData(response.data);
    };
  
    useEffect(() => {
        loadData();
    }, []);
  
    const deleteEntree = (numBonEntree) => {
      if(window.confirm("Are you sure to delete that entry?")) {
        axios.delete("http://localhost:5000/api/louer/remove/"+numBonEntree);
        toast.success('Entry deleted successfylly!');
        setTimeout(() => loadData(), 500);
      }
    }
  
    const handleSearchChange = (e) => {
      setSearchBar(e.target.value);
    }
  
    const filtered = !searchBar
      ? data 
      : data.filter((item) =>
          item.nE.toLowerCase().includes(searchBar.toLowerCase()) || 
          item.nP.toLowerCase().includes(searchBar.toLowerCase()) 
      );
  
    const [pageNumber, setPageNumber] = useState(0);
    const itemPerPage = 4;
    const pagesVisited = pageNumber * itemPerPage;
    const displayItem = filtered.slice(pagesVisited, pagesVisited+itemPerPage).map((item, index) => {
      return (
        <tr key={item.numLocataire}>
          <td>{item.numLocataire}</td>
          <td>{item.numApp}</td>
          <td>{item.nbmois}</td>
          <td>{item.dateEntree}</td>
          <td className="action">
            <Link to={"/LouerUpdate/"+item.numLocataire} >Edit</Link>
            <button className="actionbtn" onClick={ () => deleteEntree(item.numLocataire) }>Delete</button>
          </td>
        </tr>
      );
    });
  
    const pageCount = Math.ceil(filtered.length / itemPerPage);
  
    const changePage = ({selected}) => {
      setPageNumber(selected);
    };
  
    return (
      <div>
        <Sidebar />
  
        <div className="body">
          <div className="tete">
            <h2>Location</h2>
            <form className="search">
              <img src={search} alt="" className="searchimg" />
              <input className="recherche" name="recherche" placeholder="Recherche" onChange={handleSearchChange} />
            </form>
          </div>
  
          <div className="corps">
            <div className="entete">
              <Link to="/LouerAdd">Add</Link>
            </div>
            <div className="table">
              <table className="">
                <thead>
                  <tr>
                    <td>Num Locataire</td>
                    <td>Num Appartement</td>
                    <td>Nombre de mois</td>
                    <td>Date d'entree</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {displayItem} 
                </tbody>
              </table>
            </div>
            <ReactPaginate 
                previousLabel={"<"} 
                nextLabel={">"} 
                pageCount={pageCount} 
                onPageChange={changePage}
                containerClassName={"paginationBtn"} 
                previousLinkClassName={"previousBtn"} 
                nextLinkClassName={"nextBtn"} 
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"} 
            />
          </div>
        </div>
      </div>
    )
}

export default Louer;