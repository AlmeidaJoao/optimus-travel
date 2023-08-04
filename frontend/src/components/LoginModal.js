import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const LoginModal = ({ isOpen, onRequestClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    axios
      .post(`${process.env.REACT_APP_APIHOSTPORT}/users/login`, { email, password })
      .then((response) => {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        onLoginSuccess(user);
        onRequestClose();
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={onRequestClose}>
      <ModalHeader toggle={onRequestClose}>Login</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleLogin}>Login</Button>
        <Button color="secondary" onClick={onRequestClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default LoginModal;
