import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from "axios";

function AdminPage(props) {
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const [newPlant, setNewPlant] = useState({})

    //to upload the image onto the cloud
    const uploadImage = () =>{
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "taskgarden")
        data.append("cloud_name", "seiproj3images")
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

    async function submit() {
        console.log(newPlant)
        try {
            await axios.post("/api/florist/create", newPlant, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
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
                <Button onClick={submit}>Submit</Button>
            </Form>


        </div>

    );
}

export default AdminPage;