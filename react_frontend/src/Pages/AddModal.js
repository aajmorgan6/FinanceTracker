import { Button } from "@mui/material";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function AddModal({ showAdd, setAddFalse, setData }) {
    const [amount, setAmount] = useState(0.0);
    const [reason, setReason] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:8000/expenses/', {
            method: "post",
            body: JSON.stringify({
                amount: parseFloat(amount),
                reason: reason
            })
        });
        const body = await res.json();
        console.log(body);
        setAddFalse();
        setData(body);   
    }

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