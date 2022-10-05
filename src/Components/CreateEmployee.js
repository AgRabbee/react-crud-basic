import {useState} from "react";
import { useNavigate } from "react-router-dom";
import EmployeesData from "./EmployeesData";
import {v4 as uuid} from 'uuid';

function CreateEmployee(){
    const navigate = useNavigate();

    const [name, setName] =  useState('');
    const [age, setAge] =  useState('');

    function submitHandler(event){
        event.preventDefault();
        const ids = uuid();
        let id = ids.slice(0,8);
        EmployeesData.push({id:id, name: name, age: age});
        navigate('/');
    }

    return (
        <div className="container">
            <form className="col-md-8 mx-auto">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" onChange={e=>setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" className="form-control" id="age" onChange={e=>setAge(e.target.value)}/>
                </div>
                <button type="submit" onClick={submitHandler} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
export default CreateEmployee;