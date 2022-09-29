import React, {useState, useEffect} from 'react';
import Sidebar from './component/Sidebar';
import './css/Style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import search from './img/search.png';
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';

function Locataire() {

    const [data, setData] = useState([]);
    const [searchBar, setSearchBar] = useState('');
  
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/locataire/get");
        setData(response.data);
    };
  
    useEffect(() => {
        loadData();
    }, []);
  
    const deleteSortie = (numLocataire) => {
      if(window.confirm("Are you sure to delete that entry?")) {
        axios.delete("http://localhost:5000/api/locataire/remove/"+numLocataire);
        toast.success('Exit deleted successfully!');
        setTimeout(() => loadData(), 500);
      }
    }
  
    const handleSearchChange = (e) => {
      setSearchBar(e.target.value);
    }
  
    const filtered = !searchBar
      ? data 
      : data.filter((item) =>
          item.nS.toLowerCase().includes(searchBar.toLowerCase()) || 
          item.nP.toLowerCase().includes(searchBar.toLowerCase()) 
      );
    
    const [pageNumber, setPageNumber] = useState(0);
    const itemPerPage = 4;
    const pagesVisited = pageNumber * itemPerPage;
    const displayItem = filtered.slice(pagesVisited, pagesVisited+itemPerPage).map((item, index) => {
      return (
        <tr key={item.numLocataire}>
          <td>{item.numLocataire}</td>
          <td>{item.nom}</td>
          <td>{item.adresse}</td>
          <td className="action">
            <Link to={"/LocataireUpdate/"+item.numLocataire}>Edit</Link>
            <button className="actionbtn" onClick={ () => deleteSortie(item.numLocataire) }>Delete</button>
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
            <h2>Locataire</h2>
            <form className="search">
              <img src={search} alt="" className="searchimg" />
              <input className="recherche" name="recherche" placeholder="Recherche" onChange={handleSearchChange} />
            </form>
          </div>
  
          <div className="corps">
            <div className="entete">
              <Link to="/LocataireAdd">Add</Link>
            </div>
            <div className="table">
              <table className="">
                <thead>
                  <tr>
                    <td>N° Locataire</td>
                    <td>Nom</td>
                    <td>Adresse</td>
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

export default Locataire;