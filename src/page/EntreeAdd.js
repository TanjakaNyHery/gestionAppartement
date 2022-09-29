import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import './css/Login.css';

const initialState = {
    numProduit: "",
    qteEntree:"",
    dateEntree: ""
};

function EntreeAdd() {

    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/produit/get");
        setData(response.data);
    };
  
    useEffect(() => { 
        loadData();
    }, []);

    const [state, setState] = useState(initialState);

    const {numProduit, qteEntree, dateEntree} = state;

    const navigate = useNavigate();

    const {numBonEntree} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/api/entree/get/"+numBonEntree).then((resp) => setState({...resp.data[0]}));
    }, [numBonEntree])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!numBonEntree) {
            axios.post("http://localhost:5000/api/entree/post", {
                numProduit,
                qteEntree,
                dateEntree
            }).then(() => {
                setState({numProduit:"", qteEntree:"", dateEntree:""})
            })
            toast.success('Entry added successfully!');
        } else {
            axios.put("http://localhost:5000/api/entree/update/"+numBonEntree, {
                numProduit,
                qteEntree,
                dateEntree
            }).then(() => {
                setState({numProduit:"", qteEntree:"", dateEntree:""})
            })
            toast.success('Entry updated successfully!');
        }
        
        setTimeout(() => {
            navigate("/Entree");
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
                    <h3>Entrée Produit</h3>
                </div>
                <div className='element'>
                    <label htmlFor="numProduit">N°Produit</label>
                    <select name="numProduit" id="numProduit" value={numProduit || ""} onChange={handleInput}>
                        {data.map((item, index) => { 
                            return (
                                <option key={item.numProduit} value={item.numProduit}>{item.nP} - {item.design}</option>
                            );
                        })}
                    </select>
                </div>
                <div className='element'>
                    <label htmlFor="qteEntree">Quantité entrée</label>
                    <input type="number" name="qteEntree" min={1} value={qteEntree || ""} onChange={handleInput} required />
                </div>
                <div className='element'>
                    <label htmlFor="dateEntree">Date d'entrée</label>
                    <input type="date" name="dateEntree" value={dateEntree || ""} onChange={handleInput} required />
                </div>
                <input type="submit" className='savebtn' value={numBonEntree ? "UPDATE" : "SAVE"} name="save" />
                <Link className='cancelbtn' to="/Entree" >CANCEL</Link>
            </form>
        </div>
    </div>
  )
}

export default EntreeAdd;