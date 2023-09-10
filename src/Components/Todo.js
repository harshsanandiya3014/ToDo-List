import React from "react";
import { useState, useEffect } from "react";
import Api from "../Api/Api";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Todo.css";

export default function Todo(props) {
  const [data, setdata] = useState([]);
  const [newdata, setnewdata] = useState({});
  let getdata = () => {
    Api.fetchdata("tasks").then((result) => {
      setdata([...result]);
    });
  };
  useEffect(() => {
    getdata();
  }, []);

  let deletedata = (id) => {
    Api.deletedata("tasks", id).then((result) => {
      let newarr = data.filter((item) => item.id !== id);
      setdata([...newarr]);
    });
  };

  let handlesubmit = (event) => {
    event.preventDefault();
    Api.insertdata("tasks", newdata).then((result) => {
      getdata();
    });
    setnewdata([]);
  };

  // function clr (){
  //   let name = document.getElementById('name1').value = '';
  //   let course = document.getElementById('course1').value= '';
  //   let city = document.getElementById('city1').value= '';
  //   let state = document.getElementById('state1').value= '';
  // }
  let handlechange = (e) => {
    setnewdata({ ...newdata, [e.target.name]: e.target.value });
  };

  let updateData = (id) => {
    Api.fetchdata("tasks",id).then((result) => {
      console.log("1 obj data is" + result);
      console.log()
      setnewdata(result);
    });
  };

  let updateTask = () => {
    Api.updatedata("tasks", newdata.id, newdata).then((result) =>{
      console.log("data updated")
      setnewdata(result)
    });
      getdata();
    };

  return (
    <>
      <Form className="form" onSubmit={(event)=>{handlesubmit(event)}}>
        <Form.Group className="mb-3 text" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Name"
            name="name"
            onChange={handlechange}
            // id='name1'
            value={newdata.name}
          />
        </Form.Group>

        <Form.Group className="mb-3 text" controlId="formBasicPassword">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Course"
            name="course"
            onChange={handlechange}
            // id='course1'
            value={newdata.course}
          />
        </Form.Group>
        <Form.Group className="mb-3 text" controlId="formBasicPassword">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your City"
            name="city"
            onChange={handlechange}
            // id='city1'
            value={newdata.city}
          />
        </Form.Group>
        <Form.Group className="mb-3 text" controlId="formBasicPassword">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your State"
            name="state"
            onChange={handlechange}
            // id='state1'
            value={newdata.state}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit">
          Submit
        </Button>
        <Button variant="primary" type="submit" className="submit" onClick={()=>updateTask()}>
          Update
        </Button>
      </Form>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Course</th>
            <th>City</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data ? (
            data.map((item, index, id) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.course}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      deletedata(item.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={()=>{updateData(item.id)}}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <h2>Loading....</h2>
          )}
        </tbody>
      </Table>
    </>
  );
}
