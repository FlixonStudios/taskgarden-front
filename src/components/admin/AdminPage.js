import React, {useState} from 'react';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import axios from "axios";

function AdminPage(props) {
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [newPlant, setNewPlant] = useState({})
    const [newDailies, setNewDailies] = useState({})


//for new plant
//to upload the image onto the cloud
    const uploadImage = () =>{
        const data = createCloudinaryFormData();
        if (isFileUploaded(data)){
            uploadToCloudinary(data)
        }
    }

    function createCloudinaryFormData() {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "taskgarden")
        data.append("cloud_name", "seiproj3images")
        return data;
    }

    function isFileUploaded(data){
        if (!data.get("file")){
            console.log("Please upload a file")
        }
        return (data.get("file"))
    }

    function uploadToCloudinary(data){
        fetch("https://api.cloudinary.com/v1_1/seiproj3images/image/upload", {
            method: "post",
            body: data
        })
            .then(resp => resp.json())
            .then(data => {
                setUrl(data.url)
                setNewPlant(prevState => (
                    {...prevState,
                        images : ['https://res.cloudinary.com/seiproj3images/image/upload/v1624281668/foqxjhxeuxnhefyuhctl.png', data.url] }))
            })
            .catch(err => console.log(err))
    }

    //to handle the change in the input fields
    function handleChange(e) {
        setNewPlant(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    async function submitFlorist() {
        console.log(newPlant)
        try {
            await axios.post("/api/admin/florist/create", newPlant, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    //for new dailies
    //to handle the change in input fields
    function handleChangeDailies(e) {
        setNewDailies(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    //to call /admin/dailies/create
    async function submitDailies() {
        console.log(newDailies)
        try {
            await axios.post("/api/admin/dailies/create", newDailies, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Container>
            <Row>
                <Col md={4}>
                    <h3>Add New Plant to Florist</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Name of Plant" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control name="price" type="number" placeholder="Price" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Growth</Form.Label>
                            <Form.Control name="maxGrowth" type="number" placeholder="Max Growth" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Max Level</Form.Label>
                            <Form.Control name="maxLevel" type="number" placeholder="Max Level" onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control name="description" type="text" placeholder="Description" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])}/>
                            <Button onClick={uploadImage}>Upload</Button>
                        </Form.Group>
                        <div>
                            <img src={url}/>
                        </div>
                        <Button onClick={submitFlorist}>Submit</Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <h3>Add New Dailies</h3>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name of Dailies</Form.Label>
                            <Form.Control name="name" type="text" placeholder="eg. Do 20 push-ups" onChange={handleChangeDailies}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" type="text" placeholder="eg. Fitness" onChange={handleChangeDailies}/>
                        </Form.Group>
                        <Button onClick={submitDailies}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
}

export default AdminPage;