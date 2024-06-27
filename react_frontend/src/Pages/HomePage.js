import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal'


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
        <div className="container">
            <h1 className="text-center">Welcome to your Personal Finance Tracker!</h1>
            {showAdd === false ? (
                <div className='container'>
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
                <Button className="text-right btn btn-primary " variant="contained" onClick={setAddTrue}>Add Expense</Button>
            </div> 
            </div>
            ) : (
                <div className='container center'>
            <Modal show={showAdd} onHide={setAddFalse}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>Here's where we'll add expenses</Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" className='btn btn-primary' onClick={setAddFalse}>Save</Button>
                    <Button variant="" className='btn btn-secondary' onClick={setAddFalse}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            </div>
)}
        </div>
    )
}

export default HomePage;