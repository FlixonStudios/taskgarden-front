import React, {useEffect, useState} from 'react';
import {Accordion, Card, Col, Container, Button, Row, Image} from "react-bootstrap";
import axios from "axios";

function Garden(props) {
    // Number of slots in garden
    const PLANTSLOTSNUMBER = 9
    let plantSlots = []

    const [inventory, setInventory] = useState([])
    const [selected, setSelected] = useState("")
    const [garden, setGarden] = useState([])

    useEffect(() => {
        getInventory()
        getGarden()
    },[])

    async function getInventory() {
        let {data: {plants}} = await axios.get("/api/garden/inventory", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        setInventory(plants)
    }

    async function getGarden() {
        let {data: {garden}} = await axios.get("/api/garden/", {
            headers: {
                authorization: `Bearer ${localStorage.token}`
            }
        })
        setGarden(garden.plants)
    }

    function selectPlants(id) {
        setSelected("")
        if(selected !== id) setSelected(id)
    }

    // Loop to push PLANTSLOTSNUMBER * elements into plantSlots
    function createSlots(slots) {
        for (let i = 0; i < slots; i++) {
            plantSlots.push({})
        }
    } createSlots(PLANTSLOTSNUMBER)

    async function insertPlant(index){
        if(selected && !garden[index]) {
            let {data} = await axios.post(`/api/garden/inventory/${selected}`, {index}, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            getInventory()
            getGarden()
        }
        setSelected("")
    }

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
                        <Container key={el._id}
                                   className="my-4"
                                   style={{
                                       border: `3px solid ${(selected === el._id) ? 'yellow' : "white"}`
                                   }}>
                            <Image src={el.images[el.currentLevel - 1]} alt={el.name} fluid onClick={() => selectPlants(el._id)} />
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
                        <Row style={{height: "100%"}}>
                            {plantSlots.map((el,i) =>
                            <Col md={4} className="my-3">
                                <Container style={{
                                    backgroundColor: "rgb(255, 255, 255, 0.3)",
                                    borderRadius: "10px",
                                    height: "100%",
                                    width: "100%"
                                }}
                                           onClick={() => insertPlant(i)}>
                                    {((garden) && (garden.length > 0) && (garden[i] != null) )&&
                                        <Image src={garden[i].images[garden[i].currentLevel - 1]} alt={garden[i].name} fluid/>
                                    }
                                </Container>
                            </Col>
                            )}
                        </Row>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default Garden;
