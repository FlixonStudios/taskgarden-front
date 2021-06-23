import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {parseJSON} from "date-fns";
import axios from "axios";

function TaskView({clickedTask, setClickedTask, editTaskShow, setEditTaskShow, getTasks}) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selected, setSelected] = useState({IU: "none", IN: "none", UU: "none", UN: "none"})

    useEffect(() => {
        if(clickedTask.dateStart && clickedTask.dateBy) {
            setStartDate(parseJSON(clickedTask.dateStart))
            setEndDate(parseJSON(clickedTask.dateBy))
        }
        if(clickedTask) {
            setSelected({IU: "none", IN: "none", UU: "none", UN: "none"})
            let matrixName = ""

            if(clickedTask.isImportant) matrixName += "I"
            else matrixName += "U"

            if(clickedTask.isUrgent) matrixName += "U"
            else matrixName += "N"

            setSelected(prevState => ({...prevState, [matrixName]: "3px solid yellow" }))
        }
    },[editTaskShow])


    // Modal Close
    function handleClose() {
        setEditTaskShow(false)
    }

    // Form Change
    function handleChange(e) {
        setClickedTask(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    // Matrix selector
    function handleQuadrantClick(e, value) {
        if(selected[e.target.attributes.name.value] === "none") {
            setSelected({IU: "none", IN: "none", UU: "none", UN: "none"})
            setSelected(prevState => ({...prevState, [e.target.attributes.name.value]: "3px solid yellow" }))
            setClickedTask(prevState => ({...prevState, isImportant: value.isImportant, isUrgent: value.isUrgent}))
        }
        else {
            setSelected(prevState => ({...prevState, [e.target.attributes.name.value]: "none"}))
            setClickedTask(prevState => ({...prevState, isImportant: false, isUrgent: false}))
        }
    }

    // Save Changes
    async function saveForm() {

        try {
          await axios.post(`/api/tasks/edit/${clickedTask._id}`, {...clickedTask, dateStart: startDate, dateBy: endDate} , {
              headers: {
                  authorization: `Bearer ${localStorage.token}`
              }
          })
            handleClose()
            getTasks()
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <>
            {clickedTask &&
            <Modal show={editTaskShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form>
                        <Form.Group>
                            <Form.Label>Task Title</Form.Label>
                            <Form.Control name="name" type="text" placeholder="Task Title" value={clickedTask.name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Control name="category" type="text" placeholder="Category" value={clickedTask.category} onChange={handleChange}/>
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
                            <Form.Control name="description" as="textarea" rows={3} placeholder="Enter a description" value={clickedTask.description} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select Plant</Form.Label>
                            <Form.Control as="select" onChange={handleChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </Form.Control>
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

                        <Button variant="primary" onClick={saveForm}>
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            }
        </>
    );
}

export default TaskView;
