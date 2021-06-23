import React from 'react';
import {Accordion, Card, Col, Container, Button, Row} from "react-bootstrap";

function Garden({user}) {
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
                        {user.plants.map(id => (
                        <Container key={id} style={{backgroundColor: "green"}} className="p-5 my-4">
                            {id}
                        </Container>
                        ))}
                        <Container style={{backgroundColor: "green"}} className="p-5 my-4">

                        </Container>
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
