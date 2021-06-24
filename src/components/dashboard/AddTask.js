import React, {useEffect, useState} from 'react';
import {Button, Modal, Form, Row, Container, Col} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function AddTask({addTaskShow, setAddTaskShow, getTasks}) {
    const [newTaskForm, setNewTaskForm] = useState({dateBy: new Date()}) // Form State
    const [assignablePlants, setAssignablePlants] = useState([])
    const [selectedPlant, setSelectedPlant] = useState()
    // Datepicker
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [selected, setSelected] = useState({IU: "none", IN: "none", UU: "none", UN: "none"})

    useEffect(() => {
        async function getAssignablePlants() {
            let {data: {assignablePlants}} = await axios.get("/api/tasks/assignable", {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            setAssignablePlants(assignablePlants)
        }
        getAssignablePlants()
    },[])

    // Add Task Modal
    function handleClose() { // Function to close Modal
        setAddTaskShow(false);
        setSelected({IU: "none", IN: "none", UU: "none", UN: "none"})
    }

    // Form change
    function handleChange(e) {
        setNewTaskForm(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    // Handles Matrix selector click
    function handleQuadrantClick(e, value) {
        if(selected[e.target.attributes.name.value] === "none") {
            setSelected({IU: "none", IN: "none", UU: "none", UN: "none"})
            setSelected(prevState => ({...prevState, [e.target.attributes.name.value]: "3px solid yellow" }))
            setNewTaskForm(prevState => ({...prevState, isImportant: value.isImportant, isUrgent: value.isUrgent}))
        }
        else {
            setSelected(prevState => ({...prevState, [e.target.attributes.name.value]: "none"}))
            setNewTaskForm(prevState => ({...prevState, isImportant: false, isUrgent: false}))
        }
    }

    async function submit() {
        try {
            await axios.post("/api/tasks/create", {...newTaskForm, dateStart: startDate, dateBy: endDate, plantAssigned: selectedPlant}, {
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            handleClose()
            getTasks()
        } catch (e) {
            console.log(e)
        }
        setNewTaskForm(prevState => ({...prevState, isImportant: false, isUrgent: false}))
    }

    return (
        <Modal show={addTaskShow} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Form>
                    <Form.Group>
                        <Form.Label>Task Title</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Task Title" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control name="category" type="text" placeholder="Category" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="d MMM yyyy, h:mm aa"
                            />
                        <br/>
                            <Form.Label>Completed By</Form.Label>
                            <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="d MMM yyyy, h:mm aa"
                            />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" as="textarea" rows={3} placeholder="Enter a description" onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group>
                    <Form.Label>Select Plant</Form.Label>
                        <div key="inline-radio" className="mb-3">
                        {assignablePlants.length > 0 && assignablePlants.map((el, i) => (
                            <Form.Check inline
                                        value={el._id}
                                       label={el.name}
                                       name={el.name}
                                        onClick={(e) => setSelectedPlant(e.target.value)}
                                       type="radio" />
                        ))}
                        </div>
                    </Form.Group>

                    <Container>
                        <Row>
                            <Col style={{
                                backgroundColor: "rgba(231, 85, 85,1)",
                                border: `${selected.IU}`
                            }}
                                 name="IU"
                                 onClick={(e) => handleQuadrantClick(e, {isImportant: true, isUrgent: true})}>
                                Important Urgent
                            </Col>
                            <Col style={{backgroundColor: "rgba(224, 159, 159)",
                                border: `${selected.IN}`
                            }}
                                 name="IN"
                                 onClick={(e) => handleQuadrantClick(e, {isImportant: true, isUrgent: false})}>
                                Important Not-Urgent
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{backgroundColor: "rgba(241, 181, 121,1)",
                                border: `${selected.UU}`
                            }}
                                 name="UU"
                                 onClick={(e) => handleQuadrantClick(e, {isImportant: false, isUrgent: true})}>
                                Unimportant Urgent
                        </Col>
                            <Col style={{backgroundColor: "rgba(54, 150, 148,1)",
                                border: `${selected.UN}`
                            }}
                                 name="UN"
                                 onClick={(e) => handleQuadrantClick(e, {isImportant: false, isUrgent: false})}>
                                Unimportant Not-Urgent
                        </Col>
                    </Row>
                    </Container>
                    <br/>

                    <Button variant="primary" onClick={submit}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default AddTask;
