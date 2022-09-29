import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import './css/Login.css';
import { toast } from 'react-toastify';

const initialState = {
    designation: "",
    lieu:"",
    loyerMensuel:""
};

function AppartementAdd() {

    const [state, setState] = useState(initialState);

    const {designation, lieu, loyerMensuel} = state;

    const navigate = useNavigate();

    const {numApp} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/api/appartement/get/"+numApp).then((resp) => setState({...resp.data[0]}));
    }, [numApp])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!numApp) {
            axios.post("http://localhost:5000/api/appartement/post", {
                designation,
                lieu,
                loyerMensuel
            }).then(() => {
                setState({design:"", stock:""})
            })
            toast.success('Appart added successfully!');
        } else {
            axios.put("http://localhost:5000/api/appartement/update/"+numApp, {
                designation,
                lieu,
                loyerMensuel
            }).then(() => {
                setState({designation:"", lieu:"", loyerMensuel:""})
            })
            toast.success('Appart updated successfully!');
        }
        
        setTimeout(() => {
            navigate("/Appartement");
        }, 500);
    };

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]:value });
    };

  return (
    <div className='page'>
        <div className='formLogin'>
            <form action="" onSubmit={handleSubmit}>
                <div className='element'>
                    <h3>Produit</h3>
                </div>
                <div className='element'>
                    <label htmlFor="design">Designation</label>
                    <input type="text" name="designation" value={designation || ""} onChange={handleInput} required />
                </div>
                <div className='element'>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" name="lieu" value={lieu || ""} onChange={handleInput} required />
                </div>
                <div className='element'>
                    <label htmlFor="stock">Stock</label>
                    <input type="number" name="loyerMensuel" value={loyerMensuel || ""} onChange={handleInput} required />
                </div>
                <input type="submit" className='savebtn' value={numApp ? "UPDATE" : "SAVE"} name="save" />
                <Link className='cancelbtn' to="/Appartement">CANCEL</Link>
            </form>
        </div>
    </div>
  )
}

export default AppartementAdd;