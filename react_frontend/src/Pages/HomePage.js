import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import Table from 'react-bootstrap/Table'


function HomePage() {
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);

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

    const handleDetail = (data) => {
        setDetail(data);
        console.log("detail: ", detail);
        setShowDetail(true);
    }

    return (
        <div className="justify-content-center bg-info vh-100">
            <h1 className="text-center mb-3 fw-bold">Welcome to your Personal Finance Tracker!</h1>
                <div className='container'>
            <Table striped bordered hover>
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope='col'>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(data).map(key => (
                        <tr key={key} onClick={() => handleDetail(data[key])}>
                            <td>{data[key].date}</td>
                            <td>{data[key].amount}</td>
                            <td>{data[key].payment_type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
            <div className="justify-content-right">
                <Button className="text-right btn btn-primary " variant="contained" onClick={setAddTrue}>Add Expense</Button>
            </div> 
            </div>
            <div>
                <DetailModal data={detail} showDetail={showDetail} setShowDetail={setShowDetail} setData={setData} />
            </div>
            <div className='container center'>
                <AddModal showAdd={showAdd} setAddFalse={setAddFalse} setData={setData}/>
            </div>
        </div>
    )
}

export default HomePage;