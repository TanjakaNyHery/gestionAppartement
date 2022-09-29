import React, {useState, useEffect} from 'react';
import Sidebar from './component/Sidebar';
import './css/Style.css';
import axios from 'axios';
import search from './img/search.png';
import ReactPaginate from 'react-paginate';

function Etat() {
    const [data, setData] = useState([]);
    const [searchBar, setSearchBar] = useState('');
  
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/produit/get");
        setData(response.data);
    };
  
    useEffect(() => {
        loadData();
    }, []);
  
    const handleSearchChange = (e) => {
      setSearchBar(e.target.value);
    }
  
    const filtered = !searchBar
      ? data 
      : data.filter((item) =>
          item.design.toLowerCase().includes(searchBar.toLowerCase())
      );
  
    const [pageNumber, setPageNumber] = useState(0);
    const itemPerPage = 6;
    const pagesVisited = pageNumber * itemPerPage;
    const displayItem = filtered.slice(pagesVisited, pagesVisited+itemPerPage).map((item, index) => {
      return (
        <tr key={item.numProduit}>
          <td>{item.design}</td>
          <td>{item.stock}</td>
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
            <h2>Etat de Stock</h2>
            <form className="search">
              <img src={search} alt="" className="searchimg" />
              <input className="recherche" name="recherche" placeholder="Recherche" onChange={handleSearchChange} />
            </form>
          </div>
          <div className="corps">
            <div className="tableEtat">
              <table className="">
                <thead>
                  <tr>
                    <td>Designation</td>
                    <td>Stock</td>
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

export default Etat;