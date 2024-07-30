import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Navbar from '../Navbar';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
  } from 'recharts';

function HomePage() {
    const [prevDays, setPrevDays] = useState(7);
    const [data, setData] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const [dayData, setDayData] = useState([]);

    const handleChange = (val) => {
        setPrevDays(val);
        console.log(prevDays);
    }

    const callAPI = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/lastX/${prevDays}/`);
        const body = await res.json();
        setData(body);
        const days = {};
        for (const exp of body) {
            const date = exp.date.slice(0, 6)
            days[date] = (days[date] || 0) + exp.amount
        }
        const new_days = Object.keys(days).map(key => {
            return {
                date: key,
                value: days[key]
            };
        })
        console.log('days', new_days)
        setDayData(new_days);
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
        <div className="justify-content-center bg-color vh-100">
            <Navbar />
                <div className='container' style={{maxHeight: "400px", overflowY: 'auto' }}>
                    <Table striped bordered hover >
                        <thead className="thead-dark" style={{position: 'sticky', top: '0'}}>
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
                </div>
                <div className="container mt-3">
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
                <div className='mt-3'>
                    <BarChart width={600} height={400} data={dayData} className="mx-auto">
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#99d95d" />
                    </BarChart>
                </div>
            <div>
                <DetailModal data={detail} showDetail={showDetail} setShowDetail={setShowDetail} setData={setData} />
            </div>
            <div className='container center'>
                <AddModal showAdd={showAdd} setAddFalse={setAddFalse} setData={setData} prevDays={prevDays}/>
            </div>
        </div>
    )
}

export default HomePage;