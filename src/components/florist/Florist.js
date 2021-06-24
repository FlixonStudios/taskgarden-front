import React, {useEffect, useState} from 'react';
import floristImg from '../../assets/img/florist HD.jpg'
import {Col, Image, Card, Container, Row, Button, Modal} from "react-bootstrap";
import axios from "axios";
import {isAuth} from "../../lib/checks";
import coinImg from "../../assets/img/pixel-art-bitcoin-gold-coin.png"
import {useDispatch} from "react-redux";
import {updateCoins} from "../../store/actions/task.action";


function Florist({user, auth, setAuth, admin, coins}) {

    const [floristPlants, setFloristPlants] = useState([])
    const [showInsufficientCoin, setShowInsufficientCoin] = useState(false);

    const handleClose = () => setShowInsufficientCoin(false);

    const dispatch = useDispatch()

    useEffect(()=>{
        isAuth().then(suc => setAuth(suc)).catch(err => setAuth(err))
        getFloristPlants()
    },[])

    //to get the plants from DB for the shop
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

    //when buy button is clicked
    async function buyPlant(e){
        try{
            //finding the array of the plant clicked
            let plant = floristPlants.find(({_id}) => _id == e.target.value)

            //check if user have enough coins
            if(plant.price > coins){
                return setShowInsufficientCoin(true)
            }

            //send user, coins and plant to backend and get back a response of updated coins
            let newCoinsValue = await axios.post('/api/florist/buy',{coins,plant},{
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }})

            //updates the store
            dispatch(updateCoins(newCoinsValue.data.newCoins))

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
                            <Col key={plant._id}>
                                <Card  style={{width: "9rem"}} bg="warning">
                                    <Card.Img variant="top" src={plant.images[1]} style={{width: "110px", height: "110px"}}  />
                                    <Card.Body>
                                        <Card.Title>{plant.name}</Card.Title>
                                        <Card.Text>
                                            <Image style={{width: "25px", height: "25px"}} src={coinImg} />
                                            {plant.price}
                                        </Card.Text>
                                        <Button onClick={buyPlant} value={plant._id}>Buy</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Modal
                        show={showInsufficientCoin}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>u no moneh</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            You have insufficient coins for this purchase. Please do more dailies.
                        </Modal.Body>
                    </Modal>
                </Col>
            </Row>

        </Container>
    );
}

export default Florist;
