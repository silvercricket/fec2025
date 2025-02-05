/*global describe, it, expect, beforeEach, global, jest, process*/
/*eslint no-undef: "error"*/
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react';
import QA from '../../components/Q&A/QA.jsx';
import Question from '../../components/Q&A/Q&AComponents/Question.jsx';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';
import Answers from '../../components/Q&A/Q&AComponents/Answers.jsx';
import Answer from '../../components/Q&A/Q&AComponents/Answer.jsx';
import axios from 'axios';
import swal from 'sweetalert';

jest.mock('sweetalert');

jest.mock('axios');

describe('Q&A',()=>{

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render all non-conditional components of QA', () => {
    const Q_A = render(
      <Provider store={STORE}>
        <QA/>
      </Provider>
    );

    expect(Q_A.getByTestId('search-questions')).toBeDefined();

    expect(Q_A.getByTestId('questions')).toBeDefined();

    expect(Q_A.getByTestId('create-question')).toBeDefined();

  });
  describe('Question', () => {
    it('Should render question if given a question and answer', () => {
      const question = render(
        <Provider store={STORE}>
          <Question question={{
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {
              70: {
                "id": 70,
                "body": "Some of the seams started splitting the first time I wore it!",
                "date": "2019-11-28T00:00:00.000Z",
                "answerer_name": "sillyguy",
                "helpfulness": 6,
                "photos": [],
              },
              78: {
                "id": 78,
                "body": "9 lives",
                "date": "2019-11-12T00:00:00.000Z",
                "answerer_name": "iluvdogz",
                "helpfulness": 31,
                "photos": [],
              }
            }
          }}/>
        </Provider>
      );

      expect(question.getByTestId('question')).toBeDefined();

      expect(question.getByTestId('question-body')).toHaveTextContent('Q: How long does it last?');

    });

    it('Should render question if given just a question with no answer', () => {
      const question = render(
        <Provider store={STORE}>
          <Question question={{
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {}
          }}/>
      </Provider>
      );

      expect(question.getByTestId('question')).toBeDefined();

      expect(question.getByTestId('question-body')).toHaveTextContent('Q: How long does it last?');

    });

    it('CreateQuestions should call an alert if given invalid form', () => {
      const create = render(
        <Provider store={STORE}>
          <QA/>
        </Provider>
      )
      const open = create.getByTestId('open-question');
      fireEvent.click(open);
      const bodyInput = create.getByTestId('body');
      const submitButton = create.getByTestId('submit');
      fireEvent.change(bodyInput, {target: {value: 'This is a question'}});
      fireEvent.click(submitButton);
      expect(swal).toHaveBeenCalledWith("Warning", "One or more required fields are empty", "warning", {"buttons": "Continue filling form"});
    })

    it('Should create questions properly', async () => {
      const mockResponse = { data: { message: 'Created' } };
      axios.post.mockResolvedValue(mockResponse);
      const postData = {body: 'This is a question', name: 'answerer', email: 'john@gmail.com'}

      const create = render(
        <Provider store={STORE}>
          <QA/>
        </Provider>
      )
      const open = create.getByTestId('open-question');
      fireEvent.click(open);
      const bodyInput = create.getByTestId('body');
      const nameInput = create.getByTestId('name');
      const emailInput = create.getByTestId('email');
      const submitButton = create.getByTestId('submit');
      fireEvent.change(bodyInput, {target: {value: 'This is a question'}});
      fireEvent.change(nameInput, {target: {value: 'answerer'}});
      fireEvent.change(emailInput, {target: {value: 'john@gmail.com'}})
      fireEvent.click(submitButton);
      await waitFor(() => expect(axios.post).toHaveBeenCalled());
      expect(axios.post).toHaveBeenCalledWith(process.env.API_URL + '/qa/questions', postData ,{headers: {Authorization:process.env.AUTH_SECRET} });
      expect(swal).toHaveBeenCalledWith("Success", "Successfully submitted!!! 🎉", "success", {"buttons": "Continue!"});
    })

    it('SearchQuestions should set inputs correctly and throw alert when given invalid input', () => {
      const search = render(
        <Provider store={STORE}>
          <QA/>
        </Provider>
      )
      const queryInput = search.getByTestId('query');
      const searchButton = search.getByTestId('search');
      fireEvent.change(queryInput, {target: {value: 'query'}})
      expect(queryInput).toHaveValue('query');
      fireEvent.click(searchButton);
      expect(swal).toHaveBeenCalledWith("Sorry for the inconvenience", "No questions found, if you need help please feel free to leave a question addressing your concern", "info");
    })

    it('Should update yes if it is clicked on and prevent continouous click', async () => {
      const mockResponse = { data: { message: 'Updated' } };
      axios.put.mockResolvedValue(mockResponse);
      const question = render(
        <Provider store={STORE}>
          <Question question={{
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {}
          }} setRefresh={() => {}}/>
      </Provider>
      )
      const yes = question.getByTestId('yes-question');
      await waitFor(async () => {
        fireEvent.click(yes);
      })
      await waitFor(() => expect(axios.put).toHaveBeenCalled());
      expect(axios.put).toHaveBeenCalledWith(process.env.API_URL + "/qa/questions/38/helpful", {}, {"headers": {"Authorization": process.env.AUTH_SECRET}})
      expect(swal).toHaveBeenCalledWith('Success!!!', 'Successfully marked question as helpful', 'success', {buttons: 'Continue!'});
      await waitFor(async () => {
        fireEvent.click(yes);
      })
      expect(swal).toHaveBeenCalledWith('Warning', 'You cannot mark a question as helpful more than once ❌', 'warning');
    });

  })

  describe('Answer', () => {
    it('Should render answers if given an array of answers', () => {
      const answers = render(
        <Answers answers={[{"id": 8,"body": "What a great question!","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 8,"photos": [],},{"id": 5,"body": "Something pretty durable but I can't be sure","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 5,"photos": []},]} setAnswers={() => {}} question={{answers: {1: 1, 2: 2}}} setRefresh={() =>{}}/>
      );

      expect(answers.getByTestId('answers')).toBeDefined();

      expect(answers.getAllByTestId('answer-body')).toHaveLength(2);

    });
    it('CreateAnswers should call an alert if given invalid form', () => {
      const create = render(
        <Provider store={STORE}>
          <Question question={{
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {}
          }}/>
      </Provider>
      )
      const open = create.getByTestId('open-answer');
      fireEvent.click(open);
      const bodyInput = create.getByTestId('body');
      const submitButton = create.getByTestId('submit');
      fireEvent.change(bodyInput, {target: {value: 'This is a question'}});
      fireEvent.click(submitButton);
      expect(swal).toHaveBeenCalledWith("Warning", "One or more required fields are empty", "warning", {"buttons": "Continue filling form"});
    })

    it('Should create answers properly', async () => {
      global.URL.createObjectURL = jest.fn(() => 'https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/23/2020/04/Common-Coqui1-web-sized.jpg');
      const mockResponse = { data: { message: 'Created' } };
      axios.post.mockResolvedValue(mockResponse);
      const postData = {body: 'This is a answer', name: 'answerer', email: 'john@gmail.com', photos: ['https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/23/2020/04/Common-Coqui1-web-sized.jpg']}

      const create = render(
        <Provider store={STORE}>
          <Question question={{
            "question_id": 38,
            "question_body": "How long does it last?",
            "question_date": "2019-06-28T00:00:00.000Z",
            "asker_name": "funnygirl",
            "question_helpfulness": 2,
            "reported": false,
            "answers": {}
          }} setRefresh={() => {}}/>
        </Provider>
      )
      const open = create.getByTestId('open-answer');
      fireEvent.click(open);
      const bodyInput = create.getByTestId('body');
      const nameInput = create.getByTestId('name');
      const emailInput = create.getByTestId('email');
      const imageInput = create.getByTestId('images');
      const submitButton = create.getByTestId('submit');
      fireEvent.change(bodyInput, {target: {value: 'This is a answer'}});
      fireEvent.change(nameInput, {target: {value: 'answerer'}});
      fireEvent.change(emailInput, {target: {value: 'john@gmail.com'}})
      await waitFor(() => fireEvent.change(imageInput, {target: {files: ['https://www.floridamuseum.ufl.edu/wp-content/uploads/sites/23/2020/04/Common-Coqui1-web-sized.jpg']}}))
      fireEvent.click(submitButton);
      await waitFor(() => expect(axios.post).toHaveBeenCalled());
      expect(axios.post).toHaveBeenCalledWith(process.env.API_URL + '/qa/questions/38/answers', postData ,{headers: {Authorization:process.env.AUTH_SECRET} });
      expect(swal).toHaveBeenCalledWith("Success", "Successfully submitted!!! 🎉", "success", {"buttons": "Continue!"});
    });

    it('Should render image in answer if given an image', () => {
      const answers = render(
        <Answers answers={[{"id": 8,"body": "What a great question!","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 8,"photos": [],},{"id": 5,"body": "Something pretty durable but I can't be sure","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 5,"photos": ['randomphoto']},]} setAnswers={() => {}} question={{answers: {1: 1, 2: 2}}} setRefresh={() =>{}}/>
      );

      const image = answers.getByTestId('image');
      expect(image).toBeDefined();
      expect(image.src).toEqual('https://i.ibb.co/1YscJG4P/Common-Coqui1-web-sized-1.webp');
      fireEvent.click(image);
      const modal = answers.getByTestId('modal-image');
      expect(modal).toBeDefined();
      expect(modal.src).toEqual('https://i.ibb.co/1YscJG4P/Common-Coqui1-web-sized-1.webp');
    })

    it('Should update yes if it is clicked on and prevent continouous click', async () => {
      const mockResponse = { data: { message: 'Updated' } };
      axios.put.mockResolvedValue(mockResponse);
      const answer = render(
        <Answer answer={{"id": 8,"body": "What a great question!","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 8,"photos": [],}} setAnswers={() => {}} question={{answers: {1: 1, 2: 2}}} setRefresh={() =>{}} isClicked={() => {}}/>
      );
      const yes = answer.getByTestId('yes-answer');
      await waitFor(async () => {
        fireEvent.click(yes);
      })
      await waitFor(() => expect(axios.put).toHaveBeenCalled());
      expect(axios.put).toHaveBeenCalledWith(process.env.API_URL + "/qa/answers/8/helpful", {}, {"headers": {"Authorization": process.env.AUTH_SECRET}})
      expect(swal).toHaveBeenCalledWith('Success!!!', 'Successfully marked answer as helpful', 'success', {buttons: 'Continue!'});
      await waitFor(async () => {
        fireEvent.click(yes);
      })
      expect(swal).toHaveBeenCalledWith('Warning', 'You cannot mark a answer as helpful more than once ❌', 'warning');
    });
    it('Should report answer correctly', async () => {
      const mockResponse = { data: { message: 'Updated' } };
      axios.put.mockResolvedValue(mockResponse);
      const answer = render(
        <Answer answer={{"id": 8,"body": "What a great question!","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 8,"photos": [],}} setAnswers={() => {}} question={{answers: {1: 1, 2: 2}}} setRefresh={() =>{}} isClicked={() => {}}/>
      );
      const report = answer.getByTestId('report');
      fireEvent.click(report);
      await waitFor(() => expect(axios.put).toHaveBeenCalled());
      expect(axios.put).toHaveBeenCalledWith(process.env.API_URL + "/qa/answers/8/report", {}, {"headers": {"Authorization": process.env.AUTH_SECRET}})
      expect(swal).toHaveBeenCalledWith('Success!!!', 'Thank you for reporting this inappropriate answer 🫡', 'success', {buttons: 'Continue!'});
    });
  });
});