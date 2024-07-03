import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form"
import { VscAdd, VscArrowLeft } from "react-icons/vsc"

function AddModal({ showAdd, setAddFalse, setData, prevDays }) {
    const [amount, setAmount] = useState();
    const [reason, setReason] = useState("");
    const [pmtType, setPmtType] = useState("Cash");
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [showNewPmt, setShowNewPmt] = useState(false);
    const [newPmt, setNewPmt] = useState("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/expenses/', {
            method: "post",
            body: JSON.stringify({
                amount: parseFloat(amount),
                reason: reason,
                payment_type: pmtType,
                date: date,
                time: time+":00"
            })
        });
        const res = await fetch(`http://localhost:8000/lastX/${prevDays}/`)
        const body = await res.json();
        setAddFalse();
        setData(body);   
        setAmount(0.0);
        setReason("");
        setPmtType("Cash");
        setDate(new Date());
        setTime(new Date());
    }

    const handlePmtType = async (e) => {
        e.preventDefault();
        await fetch('http://localhost:8000/pmtTypes/', {
            method: "post",
            body: JSON.stringify({
                payment_type: newPmt,
            })
        });
        setShowNewPmt(false);
        setNewPmt("");
        callAPI();
    }

    const pmtTypeGoBack = () => {
        setShowNewPmt(false);
        setNewPmt("");
    }

    const callAPI = async () => {
        const res = await fetch('http://localhost:8000/pmtTypes/');
        const body = await res.json();
        setPaymentTypes(body.data);
    }

    useEffect(()=>{
        callAPI();
    }, []);

    return (
        <div className="justify-content-center">
            <Modal show={showAdd} onHide={setAddFalse}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                value={amount} 
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="Amount of Expense"
                                required
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reason</Form.Label>
                            <Form.Control 
                                type="text"
                                value={reason} 
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Reason for Expense"
                            />
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Payment Type</Form.Label>
                            <Form.Select 
                                value={pmtType} 
                                onChange={(e) => setPmtType(e.target.value)}>
                            {Object.keys(paymentTypes).map(key => (
                                <option value={paymentTypes[key].payment_type}>{paymentTypes[key].payment_type}</option>
                            ))}
                            </Form.Select>
                            {!showNewPmt &&
                                <IconButton aria-label="add">
                                    <VscAdd title="Add new payment type" onClick={() => setShowNewPmt(true)}/>
                                </IconButton>
                            }
                            {showNewPmt && (
                                <>
                                <br />
                            <Form.Control 
                                type="text" 
                                value={newPmt} 
                                onChange={(e) => setNewPmt(e.target.value)} 
                                placeholder="New form of Paymnet"
                            />
                            <IconButton aria-label="add-now">
                                <VscAdd title="Add payment type" onClick={handlePmtType} />
                            </IconButton>
                            <IconButton aria-label="go-back">
                                <VscArrowLeft title="Cancel" onClick={pmtTypeGoBack} />
                            </IconButton>
                            </>
                            )}
                        </Form.Group>
                        <Form.Group className="flex">
                            <Form.Label>Time of Expense</Form.Label>
                            <Form.Control
                                type="date"
                                name="datepic"
                                defaultValue={date}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <Form.Control
                                type="time"
                                name="time"
                                defaultValue={time}
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                            />
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" className='btn btn-primary' onClick={handleSubmit}>Save</Button>
                    <Button variant="" className='btn btn-secondary' onClick={setAddFalse}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddModal;