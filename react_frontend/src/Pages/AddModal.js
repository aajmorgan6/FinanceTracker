import { Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { VscAdd, VscArrowLeft } from "react-icons/vsc"

function AddModal({ showAdd, setAddFalse, setData }) {
    const [amount, setAmount] = useState(0.0);
    const [reason, setReason] = useState("");
    const [pmtType, setPmtType] = useState("");
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [showNewPmt, setShowNewPmt] = useState(false);
    const [newPmt, setNewPmt] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/expenses/', {
            method: "post",
            body: JSON.stringify({
                amount: parseFloat(amount),
                reason: reason,
                payment_type: pmtType
            })
        });
        const body = await res.json();
        setAddFalse();
        setData(body);   
        setAmount(0.0);
        setReason("");
        setPmtType("");
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
                    <form>
                        <label>
                            Amount:
                            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </label>
                        <label>
                            Reason:
                            <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
                        </label>
                        <label>
                            Pmt Type:
                            <select value={pmtType} onChange={(e) => setPmtType(e.target.value)}>
                            {Object.keys(paymentTypes).map(key => (
                                <option value={paymentTypes[key].payment_type}>{paymentTypes[key].payment_type}</option>
                            ))}
                            </select>
                            {!showNewPmt &&
                                <IconButton aria-label="add">
                                    <VscAdd title="Add new payment type" onClick={() => setShowNewPmt(true)}/>
                                </IconButton>
                            }
                            {showNewPmt && (
                                <>
                            <input type="text" value={newPmt} onChange={(e) => setNewPmt(e.target.value)} />
                            <IconButton aria-label="add-now">
                                <VscAdd title="Add payment type" onClick={handlePmtType} />
                            </IconButton>
                            <IconButton aria-label="go-back">
                                <VscArrowLeft title="Cancel" onClick={pmtTypeGoBack} />
                            </IconButton>
                            </>
                            )}
                            
                        </label>
                    </form>
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