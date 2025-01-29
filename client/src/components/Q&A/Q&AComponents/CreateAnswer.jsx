/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from './Modal.jsx';
import {useSelector} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';

const CreateAnswer = ({question, setRefresh}) => {
  const Product = useSelector(store => store.Product);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit= (formData) => {
    const body = formData.get("body");
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    console.log(image);
    if (true) {
      return;
    }
    if (!body || !name || !email) {
      alert('One or more of the fields are empty');
    }
    axios.post(process.env.API_URL + `/qa/questions/${question.question_id}`, {body, name, email, image},{headers: {Authorization:process.env.AUTH_SECRET} })
      .then(() => {
        setOpen(false);
        setRefresh({});
        alert('Successfully submitted!!! 🎉');
      })
      .catch(() => {
        alert('Error while submitting');
      })
  }
  const handleYes = () => {
    console.log('yes');
  }
  return (
  <div data-testid="create-answer">
      <small>Helpful?  <u onClick={handleYes}>Yes</u> {'(' + question.question_helpfulness + ')'} | </small>
      <small id="answer" onClick={handleOpen}><u>Add Answer</u></small>
      <Modal isOpen={open} onClose={handleClose}>
        <>
          <h1>Submit your Answer</h1>
          <h3>{Product.product.name}: {question.question_body}</h3>
          <form action={handleSubmit}>
            <label>Your Answer*</label>
            <br/>
            <textarea name="body" placeholder="Your answer to the question above" maxLength="1000" minLength="1" rows="5" cols="65"></textarea>
            <br/>
            <br/>
            <label> What is your nickname*</label>
            <br/>
            <input placeholder="Example: jack543!" name="name" maxLength="60" minLength="5"></input>
            <br/>
            <small>For privacy reasons, do not use your full name or email address</small>
            <br/>
            <br/>
            <label>Your email*</label>
            <br/>
            <input type="email" placeholder="Example: jack@email.com" name="email" maxLength="60" minLength="3"></input>
            <br/>
            <small>For authentication reasons, you will not be emailed</small>
            <br/>
            <br/>
            {/*Add images here*/}
            <button type="submit">Submit Answer</button>
          </form>
          <br/>
        </>
      </Modal>
    </div>
  );
};

CreateAnswer.propTypes = {
  question: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default CreateAnswer;