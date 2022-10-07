import {useState} from "react";
import { useNavigate } from "react-router-dom";

function CreateEmployee(){
    const navigate = useNavigate();

    const [name, setName] =  useState('');
    const [age, setAge] =  useState('');

    function submitHandler(event){
        event.preventDefault();
        const employeeData = {
            name: name,
            age: age
        };
        fetch('https://react-crud-dfb7e-default-rtdb.firebaseio.com/employees.json',
            {
                method: 'POST',
                body: JSON.stringify(employeeData),
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(()=>{
            navigate('/');
        });
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