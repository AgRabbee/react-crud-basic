import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

function UpdateEmployee(){
    const navigate = useNavigate();

    const [name, setName] =  useState('');
    const [age, setAge] =  useState('');
    const [id, setId] =  useState("");

    function editHandler(event){
        event.preventDefault();

        let employee = {
            name: name,
            age: age
        }
        fetch('https://react-crud-dfb7e-default-rtdb.firebaseio.com/employees/'+id+'.json/',
            {
                method: 'PATCH',
                body: JSON.stringify(employee),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(()=>{
            navigate('/');
        });
    }

    useEffect(()=>{
        setId(localStorage.getItem('id'));
        setName(localStorage.getItem('name'));
        setAge(localStorage.getItem('age'));
    },[])

    return (
        <div className="container">
            <form className="col-md-8 mx-auto">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} className="form-control" id="name" onChange={e=>setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="text" value={age} className="form-control" id="age" onChange={e=>setAge(e.target.value)}/>
                </div>
                <button type="submit" onClick={editHandler} className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}
export default UpdateEmployee;