import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

const AllEmployees = () => {

    const [render, rerender] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [EmployeesData, setEmployeesData] = useState([]);

    useEffect(() => {
        setIsLoading(true);

        fetch('https://react-crud-dfb7e-default-rtdb.firebaseio.com/employees.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                let employees = [];
                for (const emp in data) {
                    const employee = {
                        id: emp,
                        ...data[emp]
                    };
                    employees.push(employee);
                }
                rerender(false);
                setIsLoading(false);
                setEmployeesData(employees);
            })

    }, [render]);


    function editHandler(employee) {
        localStorage.setItem('id', employee.id);
        localStorage.setItem('name', employee.name);
        localStorage.setItem('age', employee.age);
    }

    function deleteHandler(id) {
        var index = EmployeesData.map(ele => ele.id).indexOf(id);
        if (!window.confirm(`Are you sure to delete #${EmployeesData[index].name}?`)) {
            return false;
        }
        fetch('https://react-crud-dfb7e-default-rtdb.firebaseio.com/employees/' + id + '.json/',
            {
                method: 'DELETE'
            }
        ).then(() => {
            rerender(true);
        });
    }

    if (isLoading) {
        return (
            <section>
                <p>Loading....</p>
            </section>
        );
    }
    return (
        <div className="container">
            <div className="col-md-8 mx-auto">
                <Link to="/create" className="btn btn-sm btn-success my-2">Add New</Link>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Sl</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        EmployeesData && EmployeesData.length > 0 ?
                            EmployeesData.map((ele, index) => {
                                return (
                                    <tr key={ele.id}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{ele.name}</td>
                                        <td>{ele.age}</td>
                                        <td>
                                            <Link to="/update" className="btn btn-sm btn-info mr-1"
                                                  onClick={() => editHandler(ele)}>Edit</Link>

                                            <button className="btn btn-sm btn-danger"
                                                    onClick={() => deleteHandler(ele.id)}>Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                            :
                            <tr>
                                <td colSpan="4">No record found</td>
                            </tr>
                    }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default AllEmployees;