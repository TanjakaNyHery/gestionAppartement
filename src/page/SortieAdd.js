import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';
import {toast} from 'react-toastify';

const initialState = {
    numProduit: "",
    qteSortie:"",
    dateSortie: ""
};

function SortieAdd() {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/produit/get");
        setData(response.data);
    };
  
    useEffect(() => {
        loadData();
    }, []);

    const [state, setState] = useState(initialState);

    const {numProduit, qteSortie, dateSortie} = state;

    const navigate = useNavigate();

    const {numBonSortie} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/api/sortie/get/"+numBonSortie).then((resp) => setState({...resp.data[0]}));
    }, [numBonSortie])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!numBonSortie) {
            axios.post("http://localhost:5000/api/sortie/post", {
                numProduit,
                qteSortie,
                dateSortie
            }).then(() => {
                setState({numProduit:"", qteSortie:"", dateSortie:""});
            })
            toast.success('Exit added successfully!');
        } else {
            axios.put("http://localhost:5000/api/sortie/update/"+numBonSortie, {
                numProduit,
                qteSortie,
                dateSortie
            }).then(() => {
                setState({numProduit:"", qteSortie:"", dateSortie:""});
            })
            toast.success('Exit updated successfully!');
        }
        
        setTimeout(() => {
            navigate("/Sortie");
        }, 500);
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]:value });
    };

  return (
    <div className='page'>
        <div className='formE'>
            <form action="" onSubmit={handleSubmit}>
                <div className='element'>
                    <h3>Sortie Produit</h3>
                </div>
                <div className='element'>
                    <label for="numProduit">N°Produit</label>
                    <select name="numProduit" id="numProduit" value={numProduit || ""} onChange={handleInput}>
                        {data.map((item, index) => { 
                            return (
                                <option value={item.numProduit}>{item.nP} - {item.design}</option>
                            );
                        })}
                    </select>
                </div>
                <div className='element'>
                    <label for="qteSortie">Quantité sortie</label>
                    <input type="number" name="qteSortie" value={qteSortie || ""} onChange={handleInput} required />
                </div>
                <div className='element'>
                    <label for="dateSortie">Date de sortie</label>
                    <input type="date" name="dateSortie" value={dateSortie || ""} onChange={handleInput} required />
                </div>
                <input type="submit" className='savebtn' value={numBonSortie ? "UPDATE" : "SAVE"} name="save" />
                <Link className='cancelbtn' to="/Sortie">CANCEL</Link>
            </form>
        </div>
    </div>
  )
}

export default SortieAdd;