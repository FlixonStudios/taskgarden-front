import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import axios from "axios";

function DailiesBar(props) {
    const [daily, setDaily] = useState({mes: "Description"})
    let containerStyle = {
        border: "5px solid rgba(35, 108, 56, 1)",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
    }
    let buttonStyle = {
        border: "3px solid rgba(50, 136, 29, 1)",
        backgroundColor: "rgba(78, 201, 47, 1)",
        borderRadius: "10px",
        boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)"
    }

    useEffect(() => {
        async function getDailies() {
            try {
                let dailyRes = await axios.get("/api/user/dailies", {
                    headers: {
                        authorization: `Bearer ${localStorage.token}`
                    }
                })
                setDaily(dailyRes)
            } catch (e) {
                console.log(e)
            }
        }
    })

    async function handleClick() {
        await axios.post("/api/user/dailies/update", daily, {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
    }

    return (
        <Container style={containerStyle} className="mt-3" >
            <Row className="align-items-center">
                <Col md={9}>
                    Dailies
                    <br/>
                    {daily.mes}
                </Col>
                <Col md={3}>
                    <Button style={buttonStyle}>Completed!</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DailiesBar;
