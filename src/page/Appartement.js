import React, {useState, useEffect} from 'react';
import Sidebar from './component/Sidebar';
import './css/Style.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import search from './img/search.png';
import ReactPaginate from 'react-paginate';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Appartement() {

    const [data, setData] = useState([]);
    const [searchBar] = useState('');
  
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/appartement/get");
        setData(response.data);
    };
  
    useEffect(() => {
        loadData();
    }, []);
  
    const deleteAppartement = (numApp) => {
      if(window.confirm("Are you sure to delete that appart?")) {
        axios.delete("http://localhost:5000/api/appartement/remove/"+numApp);
        toast.success('Appart deleted successfully', {
          position: toast.POSITION.TOP_CENTER
        });
        setTimeout(() => loadData(), 500);
      }
    }
  

  
    const filtered = !searchBar
      ? data 
      : data.filter((item) =>
          item.nP.toLowerCase().includes(searchBar.toLowerCase()) || 
          item.design.toLowerCase().includes(searchBar.toLowerCase())
      );
  
    const [pageNumber, setPageNumber] = useState(0);
    const itemPerPage = 4;
    const pagesVisited = pageNumber * itemPerPage;
    const displayItem = filtered.slice(pagesVisited, pagesVisited+itemPerPage).map((item, index) => {
      return (
        <tr key={item.numApp}>
          <td>{item.designation}</td>
          <td>{item.lieu}</td>
          <td>{item.loyerMensuel}</td>
          <td className="action">
            <Link to={"/AppartementUpdate/"+item.numApp}>Edit</Link>
            <button className="actionbtn" onClick={ () => deleteAppartement(item.numApp) } >
              Delete</button>
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
            <h2>Appartement</h2>
            <form className="search">
              <img src={search} alt="" className="searchimg" />
              <input className="recherche" name="recherche" placeholder="Recherche"/>
            </form>
          </div>
  
          <div className="corps">
            <div className="entete">
              <Link to="/ProduitAdd">Add</Link>
            </div>
            <div className="table">
              <table className="">
                <thead>
                  <tr>
                    <td>N° Appartement</td>
                    <td>Designation</td>
                    <td>Lieu</td>
                    <td>Loyer Mensuel</td>
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

export default Appartement;