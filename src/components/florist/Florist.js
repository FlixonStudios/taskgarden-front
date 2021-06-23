import React, {useEffect, useState} from 'react';
import floristImg from '../../assets/img/florist HD.jpg'
import {Col, Image, Card, Container, Row, CardGroup, Button} from "react-bootstrap";
import axios from "axios";
import {isAuth} from "../../lib/checks";
import coinImg from "../../assets/img/pixel-art-bitcoin-gold-coin.png"


function Florist({auth, setAuth}) {
    const [floristPlants, setFloristPlants] = useState([])

    useEffect(()=>{
        console.log(auth)
        isAuth().then(suc => setAuth(suc)).catch(err => setAuth(err))
        setAuth(isAuth())
        getFloristPlants()
    },[])

    async function getFloristPlants(){
        try{
            let floristPlants = await axios.get('/api/florist', {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }})
            setFloristPlants(floristPlants.data.payload)
        }catch(e){
            console.log(e.response)
        }
    }

    async function buyPlant(){
        try{
            let floristPlants = await axios.get('/api/florist', {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }})
            setFloristPlants(floristPlants.data.payload)
        }catch(e){
            console.log(e.response)
        }
    }

    return (
        <Container>
            <Row>
                <Col md={5}>
                    <Image src={floristImg} fluid/>
                </Col>
                <Col md={7}>
                    <Row md={3} xs={1} className="g-4">
                        {floristPlants.length > 0 && floristPlants.map(plant => (
                            <Col>
                                <Card key={plant._id} style={{width: "9rem"}} bg="warning">
                                    <Card.Img variant="top" src={plant.images[1]} style={{width: "110px", height: "110px"}}  />
                                    <Card.Body>
                                        <Card.Title>{plant.name}</Card.Title>
                                        <Card.Text>
                                            <Image style={{width: "25px", height: "25px"}} src={coinImg} />
                                            {plant.price}
                                        </Card.Text>
                                        <Button>Buy</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

        </Container>
    );
}

export default Florist;
