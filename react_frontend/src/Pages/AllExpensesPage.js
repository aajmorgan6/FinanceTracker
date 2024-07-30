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
    const [filter, setFilter] = useState();
    const [total, setTotal] = useState(0.0);

    const handleChange = (val) => {
        setFilter(val);
        if (val === 0) { // Oldest first
            callAPI();
        } else if (val === 1) { // Newest first
            setData(data.reverse());
        } else if (val === 2) { // Most expensive
            setData(data.sort((a, b) => b.amount - a.amount))
        } else if (val === 3) { // Most expensive
            setData(data.sort((a, b) => a.amount - b.amount))
        }
    }

    const callAPI = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expenses/`);
        const body = await res.json();
        console.log(body);
        setData(body);
        var tmp = 0.0
        for (const exp in data) {
            tmp += data[exp].amount;
        }
        setTotal(tmp);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    const handleDetail = (data) => {
        setDetail(data);
        console.log("detail: ", detail);
        setShowDetail(true);
    }

    return (
        <div className="justify-content-center bg-color vh-100">
            <Navbar />
                <div className='container' style={{maxHeight: "800px", overflowY: 'auto' }}>
                    <Table striped bordered hover>
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
                <div className="mt-3 container">
                        <label>Total Expenses: ${total.toFixed(2)}</label>
                        <ToggleButtonGroup 
                            type="radio" 
                            name="options" 
                            defaultValue={0}
                            className="float-end"
                            value={filter}
                            onChange={handleChange}
                            >
                            <ToggleButton id="old" value={0}>Oldest</ToggleButton>
                            <ToggleButton id="new" value={1}>Newest</ToggleButton>
                            <ToggleButton id="amountH" value={2}>Amount High</ToggleButton>
                            <ToggleButton id="amountL" value={3}>Amount Low</ToggleButton>
                        </ToggleButtonGroup>
                    </div> 
            <div>
                <DetailModal data={detail} showDetail={showDetail} setShowDetail={setShowDetail} setData={setData} />
            </div>
        </div>
    )
}

export default AllExpensesPage;