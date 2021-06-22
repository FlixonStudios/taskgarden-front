import React, {useEffect} from 'react';
import floristImg from '../../assets/img/florist HD.jpg'
import {Col, Image, Card} from "react-bootstrap";
import axios from "axios";
import {isAuth} from "../../lib/checks";


function Florist({auth, setAuth}) {

    useEffect(()=>{
        console.log(auth)
        setAuth(isAuth())
        getFloristPlants()
    },[])

    async function getFloristPlants(){
        try{
            let floristPlants = await axios.get('/api/florist', {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }})
        }catch(e){
            console.log(e.response)
        }
    }

    return (
        <div>
            <Col md={5}>
                <Image src={floristImg} />
            </Col>
            <Col md={7}>
                <Card>
                    <Card.Img src={""}/>
                </Card>
            </Col>
        </div>
    );
}

export default Florist;