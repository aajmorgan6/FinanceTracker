import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

function DetailModal({ data, showDetail, setShowDetail, setData }) {

    const handleDelete = async () => {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/expenses/${data.id}`, {
            method: "delete"
        });
        const body = await res.json();
        setData(body);
        setShowDetail(false);
    }

    return (
        <div className="justify-content-center">
            <Modal show={showDetail} onHide={setShowDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Expense {data.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Date: {data.date}</h5>
                    <h5>Amount: ${data.amount}</h5>
                    <h5>Payment Type: {data.payment_type}</h5>
                    <h5>Reason: {data.reason}</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={() => setShowDetail(false)}>Close</Button>
                    <Button className="secondary" onClick={handleDelete}>Delete Expense</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DetailModal;