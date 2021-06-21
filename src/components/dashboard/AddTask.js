import React, {useState} from 'react';
import {Button, Modal, Form, ButtonGroup, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment"
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function AddTask({addTaskShow, setAddTaskShow, getTask}) {

    const [newTaskForm, setNewTaskForm] = useState({dateBy: new Date()}) // Form State
    const [startDate, setStartDate] = useState(new Date()); // Datepicker

    // Add Task Modal
    function handleClose() { // Function to close Modal
        setAddTaskShow(false);
        setNewTaskForm({dateBy: new Date()}) // Reset form after closing
    }

    // Form change
    function handleChange(e) {
        setNewTaskForm(prevState => ({...prevState, [e.target.name] : e.target.value }))
    }

    function handleDateChange(date) {
        setStartDate(date)
        setNewTaskForm(prevState => ({...prevState, dateBy: date}))
    }

    function handleQuadrantClick(value) {
        setNewTaskForm(prevState => ({...prevState, isImportant: value.isImportant, isUrgent: value.isUrgent}))
    }

    async function submit() {
        try {
            await axios.post("/api/tasks/create", newTaskForm,{
                headers: {
                    authorization: `Bearer ${localStorage.token}`
                }
            })
            handleClose()
            getTask()
        } catch (e) {
            console.log(e)
        }
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
                        <Form.Label>Completed By</Form.Label>
                        <div><DatePicker name="dateBy" selected={startDate} onChange={(date) => handleDateChange(date)} /></div>
                    </Form.Group>

                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Select Plant</Form.Label>
                        <Form.Control as="select">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </Form.Control>
                    </Form.Group>

                        <ToggleButtonGroup name="matrix" size="lg" onChange={handleQuadrantClick}>
                            <ToggleButton
                                variant="secondary"
                                value={{isImportant: true, isUrgent: true}}>
                                Important Urgent
                            </ToggleButton>
                            <ToggleButton
                                variant="secondary"
                                value={{isImportant: true, isUrgent: false}}>
                                Important Not-Urgent
                            </ToggleButton>
                    <br/>
                            <ToggleButton
                                variant="secondary"
                                value={{isImportant: false, isUrgent: true}}>
                                Unimportant Urgent
                            </ToggleButton>
                            <ToggleButton
                                variant="secondary"
                                value={{isImportant: false, isUrgent: false}}>
                                Unimportant Not-Urgent
                            </ToggleButton>
                        </ToggleButtonGroup>
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
