import React, {useEffect, useState} from 'react';
import {Accordion, Card, Col, Container, Button, Row, Image} from "react-bootstrap";
import axios from "axios";

function Garden(props) {
    const [inventory, setInventory] = useState([])

    useEffect(() => {
        async function getInventory() {
            let {data: {plants}} = await axios.get("/api/garden/", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            console.log(plants)
            setInventory(plants)
        }
        getInventory()
    },[])

    return (
        <Container className="my-5">
            <Row>
                <Col md={3}>
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="primary" eventKey="0">
                        Inventory
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        {inventory.length > 0 && inventory.map(el => (
                        <Container key={el._id} className="my-4">
                            <Image src={el.images[el.currentLevel - 1]} alt={el.name} fluid />
                            {el.name}
                        </Container>
                        ))}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
                </Col>
                <Col md={9}>
                    <Container style={{height: "70vh", backgroundColor: "green"}}>

                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Garden;
