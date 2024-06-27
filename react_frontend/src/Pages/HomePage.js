import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddModal from './AddModal';


function HomePage() {
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    const callAPI = async () => {
        const res = await fetch('http://localhost:8000/expenses/');
        const body = await res.json();
        console.log(body);
        setData(body);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const setAddTrue = () => setShowAdd(true);
    const setAddFalse = () => setShowAdd(false);

    return (
        <div className="justify-content-center">
            <h1 className="text-center">Welcome to your Personal Finance Tracker!</h1>
                <div className='container'>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope='col'>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(key => (
                        <tr key={key}>
                            <td>{data[key].date}</td>
                            <td>{data[key].amount}</td>
                            <td>{data[key].payment_type}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
            <div className="justify-content-right">
                <Button className="text-right btn btn-primary " variant="contained" onClick={setAddTrue}>Add Expense</Button>
            </div> 
            </div>
            <div className='container center'>
                <AddModal showAdd={showAdd} setAddFalse={setAddFalse} setData={setData}/>
            </div>
        </div>
    )
}

export default HomePage;