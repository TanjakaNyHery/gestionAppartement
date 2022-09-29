import React, {useState, useEffect} from 'react';
import Sidebar from './component/Sidebar';
import './css/Style.css';
import axios from 'axios';
import search from './img/search.png';
import ReactPaginate from 'react-paginate';

const initialState = {
    design: "",
    stock: ""
};
  
  const initialTotal = {
    nbTE : "",
    nbTS : ""
}  

function Mvt() {
  
    const [data, setData] = useState([]);     
    const [state, setState] = useState([]);        
    const [selectedValue, setSelectedValue] = useState();      
    const [prod, setProd] = useState(initialState);
    const [total, setTotal] = useState(initialTotal);
    const [searchBar, setSearchBar] = useState('');
  
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/produit/get");
        setData(response.data);
    };
  
    const fetchData = async (numProd) => {
      await axios.get("http://localhost:5000/api/mvt/get/"+numProd)
      .then((resp) => {
        setState(resp.data);
      })
    };
  
    useEffect(() => {
      loadData();
    }, []);
  
    useEffect(() => {
      fetchData(selectedValue);
      axios.get("http://localhost:5000/api/produit/get/"+selectedValue).then((respond) => setProd({...respond.data[0]}));
      axios.get("http://localhost:5000/api/mvtTotal/get/"+selectedValue).then((r) => setTotal({...r.data[0]}));
    }, [selectedValue]);
  
    const handleInput = (e) => {
      const {name, value} = e.target;
      setProd({ ...prod, [name]:value });
    };
  
    const handleTotal = (e) => {
      const {name, value} = e.target;
      setTotal({ ...total, [name]:value });
    };
  
    const handleSelect = (e) => {
      setSelectedValue(e.target.value);
    }
  
    const handleSearch = (e) => {
      setSearchBar(e.target.value);
    }
  
    const filtered = !searchBar
      ? state 
      : state.filter((item) =>
          item.dateM.toLowerCase().includes(searchBar.toLowerCase()) 
      );
  
    const [pageNumber, setPageNumber] = useState(0);
    const itemPerPage = 4;
    const pagesVisited = pageNumber * itemPerPage;
    const displayItem = filtered.slice(pagesVisited, pagesVisited+itemPerPage).map((item, index) => {
      return (
        <tr key={item.nb}>
          <td>{item.nb}</td>
          <td>{item.qteE}</td>
          <td>{item.qteS}</td>
          <td>{item.dateM}</td>
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
            <h2>Mouvement de Stock</h2>
            <form className="search">
              <img src={search} alt="" className="searchimg" />
              <input className="recherche" name="recherche" placeholder="Recherche par date" onChange={handleSearch} />
            </form>
          </div>
          <div className="corps">
          <div className="entete">
              <form className="form">
                <select onChange={handleSelect}>
                  <option>N° Produit</option>
                  {data.map((item, index) => { 
                    return (
                      <option key={item.numProduit} value={item.numProduit}>{item.nP}</option>
                    );
                  })}
                </select>
                <input type="text" name='design' value={"Designation : " + prod.design} onChange={handleInput} disabled />
                <input type="text" name='stock' value={"Stock : " + prod.stock} onChange={handleInput} disabled />
              </form>
              <form className="total">
                <input type="text" name='nbTE' value={"Nombre total d'entrée  : " + total.nbTE} onChange={handleTotal} disabled />
                <input type="text" name='nbTS' value={"Nombre total de sortie : " + total.nbTS} onChange={handleTotal} disabled />
              </form>
            </div>
            <div className="tablemvt">
              <table className="">
                <thead>
                  <tr>
                    <td>N° Bon</td>
                    <td>Quantité entrée</td>
                    <td>Quantité sortie</td>
                    <td>Date</td>
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

export default Mvt;