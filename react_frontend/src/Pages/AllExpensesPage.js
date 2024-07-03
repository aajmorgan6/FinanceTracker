import { useEffect, useState } from 'react';
import DetailModal from './DetailModal';
import Table from 'react-bootstrap/Table'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Navbar from '../Navbar';

function AllExpensesPage() {
    const [data, setData] = useState([]);
    const [showDetail, setShowDetail] = useState(false);
    const [detail, setDetail] = useState([]);
    const [filter, setFilter] = useState("");

    const handleChange = async (val) => {
        setFilter(val);
        console.log(filter);
    }

    const callAPI = async () => {
        const res = await fetch(`http://localhost:8000/expenses/`);
        const body = await res.json();
        console.log(body);
        setData(body);
    }

    useEffect(()=>{
        setFilter(filter);
        callAPI();
    }, [filter]);

    const handleDetail = (data) => {
        setDetail(data);
        console.log("detail: ", detail);
        setShowDetail(true);
    }

    return (
        <div className="justify-content-center bg-info vh-100">
            <Navbar />
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
                <label>Sort by</label>
                <ToggleButtonGroup 
                    type="radio" 
                    name="options" 
                    defalutValue={1} 
                    className="float-end"
                    value={filter}
                    onChange={handleChange}
                    >
                    <ToggleButton id="today" value={""}>Today</ToggleButton>
                    <ToggleButton id="week" value={"nto"}>1 Week</ToggleButton>
                    <ToggleButton id="month" value={"something"}>1 Month</ToggleButton>
                    <ToggleButton id="year" value={"365"}>1 Year</ToggleButton>
                </ToggleButtonGroup>
            </div> 
            </div>
            <div>
                <DetailModal data={detail} showDetail={showDetail} setShowDetail={setShowDetail} setData={setData} />
            </div>
        </div>
    )
}

export default AllExpensesPage;