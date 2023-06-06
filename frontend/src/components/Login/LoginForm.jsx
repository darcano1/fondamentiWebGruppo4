import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../../App.css';

export default function LoginForm({ handleSubmit }) {
  return (
    <Form id="login-form">
      <Form.Group className="mb-3">
        <Form.Control className="inputForm" type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control className="inputForm" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="formButton">
        <Form.Control className="inputForm" type="submit" className="btn btn-primary" value="SIGN IN" />
      </Form.Group>
    </Form>
)
}