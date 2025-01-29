/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import {useSelector} from 'react-redux';
import PropTypes from 'prop-types';

const CreateQuestion = ({setRefresh}) => {
  const Product = useSelector(store => store.Product);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit= (formData) => {
    const body = formData.get("body");
    const name = formData.get("name");
    const email = formData.get("email");
    if (!body || !name || !email) {
      alert('One or more of the fields are empty');
    }
    axios.post(process.env.API_URL + '/qa/questions', {body, name, email, product_id: Product.product.id},{headers: {Authorization:process.env.AUTH_SECRET} })
      .then(() => {
        setOpen(false);
        setRefresh({});
        alert('Successfully submitted!!! 🎉');
      })
      .catch(() => {
        alert('Error while submitting');
      })
  }
  return (
  <div data-testid="create-question">
    <button onClick={handleOpen}>Create Question</button>
    <Modal isOpen={open} onClose={handleClose}>
      <>
        <h1>Ask Your Question</h1>
        <h3>About the {Product.product.name}</h3>
        <form action={handleSubmit}>
          <label>Your Question*</label>
          <br/>
          <textarea name="body" placeholder="Why did you like the product or not?" maxLength="1000" minLength="1" rows="5" cols="65"></textarea>
          <br/>
          <br/>
          <label> What is your nickname*</label>
          <br/>
          <input placeholder="Example: jackson11!" name="name" maxLength="60" minLength="5"></input>
          <br/>
          <small>For privacy reasons, do not use your full name or email address</small>
          <br/>
          <br/>
          <label>Your email*</label>
          <br/>
          <input type="email" placeholder="Example: john@gmail.com" name="email" maxLength="60" minLength="3"></input>
          <br/>
          <small>For authentication reasons, you will not be emailed</small>
          <br/>
          <br/>
          <button type="submit">Submit question</button>
        </form>
        <br/>
      </>
    </Modal>
  </div>
  );
};

CreateQuestion.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default CreateQuestion;