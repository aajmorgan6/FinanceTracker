import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function HomePage() {
    const [prevDays, setPrevDays] = useState(7);
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);

    const handleChange = async (val) => {
        setPrevDays(val);
        console.log(prevDays);
    }

    const callAPI = async () => {
        const res = await fetch(`http://localhost:8000/lastX/${prevDays}/`);
        const body = await res.json();
        console.log(body);
        setData(body);
    }

    useEffect(()=>{
        setPrevDays(prevDays);
        callAPI();
    }, [prevDays]);

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
                            <td>{data[key].amount.toFixed(2)}</td>
                            <td>{data[key].payment_type}</td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
            <div className="">
                <Button className="text-right btn btn-primary " variant="contained" onClick={setAddTrue}>Add Expense</Button>
                <ToggleButtonGroup 
                    type="radio" 
                    name="options" 
                    defalutValue={1} 
                    className="float-end"
                    value={prevDays}
                    onChange={handleChange}
                    >
                    <ToggleButton id="today" value={0}>Today</ToggleButton>
                    <ToggleButton id="week" value={7}>1 Week</ToggleButton>
                    <ToggleButton id="month" value={30}>1 Month</ToggleButton>
                    <ToggleButton id="year" value={365}>1 Year</ToggleButton>
                </ToggleButtonGroup>
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