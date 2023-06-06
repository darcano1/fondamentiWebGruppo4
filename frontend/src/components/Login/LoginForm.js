import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';

export default function LoginForm({ handleSubmit }) {
  
  return (
    <Form id="login-form" onSubmit={handleSubmit} >
      <Form.Group className="mb-3">
        <Form.Control className="inputForm" type="text" placeholder="Username" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control className="inputForm" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="formButton">
        <Form.Control id="btn-signin" type="submit" className="btn btn-primary inputForm" value="Sign in" />
      </Form.Group>
    </Form>
  )
}