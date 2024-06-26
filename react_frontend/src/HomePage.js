import { useEffect, useState } from 'react';
import { Button } from '@mui/material';


function HomePage() {
    const [data, setData] = useState([]);

    const callAPI = async () => {
        const res = await fetch('http://localhost:8000/expenses/');
        const body = await res.json();
        console.log(body);
        setData(body);
    }

    useEffect(()=>{
        callAPI();
    }, [])

    return (
        <div>
            <h1 className="text-center">Welcome to your Personal Finance Tracker!</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope='col'>Reason</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(key => (
                        <tr key={key}>
                            <td>{data[key].date}</td>
                            <td>{data[key].amount}</td>
                            <td>{data[key].reason}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="justify-content-center">
                <Button className="btn btn-primary me-3" href="/" variant="contained">Back</Button>
                <Button className="text-right btn btn-primary " href="/recipes/add" variant="contained">Add</Button>
            </div>
        </div>
    )
}

export default HomePage;