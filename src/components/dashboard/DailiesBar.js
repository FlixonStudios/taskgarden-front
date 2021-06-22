import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";

function DailiesBar(props) {
    const [daily, setDaily] = useState({})
    useEffect(() => {

    })

    return (
        <Container style={{border: "3px solid black"}}>
            <Row>
                <Col md={9}>
                    Dailies
                </Col>
                <Col md={3}>
                    <Button>Completed!</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default DailiesBar;
