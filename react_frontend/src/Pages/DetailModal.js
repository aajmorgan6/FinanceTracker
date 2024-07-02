import { Button } from "@mui/material";
// import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

function DetailModal({ data, showDetail, setShowDetail }) {

    return (
        <div className="justify-content-center">
            <Modal show={showDetail} onHide={setShowDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Expense {data.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h3>Date: {data.date}</h3>
                    <h3>Amount: ${data.amount}</h3>
                    <h3>Payment Type: {data.payment_type}</h3>
                    <h3>Reason: {data.reason}</h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="contained" onClick={() => setShowDetail(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default DetailModal;