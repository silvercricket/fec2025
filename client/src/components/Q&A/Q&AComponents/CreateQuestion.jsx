/*global process*/
/*eslint no-undef: "error"*/
import React from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {QuestionsActions} from '../../../store/QuestionsSlice.js'
const CreateQuestion = ({setRefresh}) => {
  const dispatch = useDispatch();
  const Product = useSelector(store => store.Product);
  const QuestionsData = useSelector(store => store.QuestionsData)
  const [open, setOpen] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  React.useEffect(() => {
    if (Product.product.id) {
      axios.get(process.env.API_URL + `/qa/questions?count=2147483647&product_id=${40499}`,{headers: {Authorization:process.env.AUTH_SECRET} })
        .then((result)=>{
          console.log(result.data.results)
          setQuestions(result.data.results);
        })
        .catch((err) => {
          if (err.response.status === 429) {
            alert('Sorry traffic is full please refresh your browser');
          } else {
            alert('error while retrieving questions');
          }
        })
    }
  }, [QuestionsData])
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
  const handleQuestions = () => {
    setClicked(true);
    dispatch(QuestionsActions.setQuestions(questions));
  }
  const handleCollapse = () => {
    setClicked(false);
    setRefresh({});
  };
  return (
  <div data-testid="create-question">
    {console.log(Product)}
    {questions.length > 4 && !clicked ? <h3 style={{border: 'solid black', padding: '20px 10px', width:'fit-content'}} onClick={handleQuestions}>MORE ANSWERED QUESTIONS</h3> : (clicked ? <h3 style={{border: 'solid black', padding: '20px 10px', width:'fit-content'}} onClick={handleCollapse}>Collapse Questions</h3> : null)}

    <h3 style={{border: 'solid black', padding: '20px 10px', width:'fit-content'}} onClick={handleOpen}>ADD A QUESTION ➕</h3>
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