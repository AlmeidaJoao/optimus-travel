import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const AccountCreationModal = ({ isOpen, onRequestClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateAccount = () => {
    axios
      .post(`${process.env.REACT_APP_APIHOSTPORT}/users`, { email, password })
      .then((response) => {
        console.log('Account created:', response.data);
        onRequestClose();
      })
      .catch((error) => {
        console.error('Account creation error:', error);
      });
  };

  return (
    <Modal isOpen={isOpen} toggle={onRequestClose}>
      <ModalHeader toggle={onRequestClose}>Create Account</ModalHeader>
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
        <Button color="primary" onClick={handleCreateAccount}>Create Account</Button>
        <Button color="secondary" onClick={onRequestClose}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default AccountCreationModal;
