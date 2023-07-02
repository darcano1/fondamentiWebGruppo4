import React from 'react'
import Form from 'react-bootstrap/Form';

export default function LoginForm({ handleSubmit, messaggioServer }) {
  
  return (
    <Form id="login-form" onSubmit={handleSubmit} >
      <Form.Group className="mb-3">
        <Form.Control name="email" className="inputForm" type="text" placeholder="Email" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control name="psw" className="inputForm" type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="formButton">
        {messaggioServer !== '' ? <Form.Floating className='mb-3' style={{color: 'red', fontSize: "1.1rem"}}>{messaggioServer}</Form.Floating> : null}
        <Form.Control id="btn-signin" type="submit" className="btn btn-primary inputForm" value="Sign in" />
      </Form.Group>
    </Form>
  )
}