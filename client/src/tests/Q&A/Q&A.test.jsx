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
import axios from 'axios';

jest.mock('axios');

describe('Q&A',()=>{
  beforeEach(() => {
    global.alert = jest.fn()
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

  it('Should render answers if given an array of answers', () => {
    const answers = render(
      <Answers answers={[{"id": 8,"body": "What a great question!","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 8,"photos": [],},{"id": 5,"body": "Something pretty durable but I can't be sure","date": "2018-01-04T00:00:00.000Z","answerer_name": "metslover","helpfulness": 5,"photos": [{"id": 1,"url": "urlplaceholder/answer_5_photo_number_1.jpg"},{"id": 2,"url": "urlplaceholder/answer_5_photo_number_2.jpg"},]},]} setAnswers={() => {}} question={{answers: {1: 1, 2: 2}}} setRefresh={() =>{}}/>
    );

    expect(answers.getByTestId('answers')).toBeDefined();

    expect(answers.getAllByTestId('answer-body')).toHaveLength(2);

  });

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
    expect(global.alert).toHaveBeenCalledWith('No questions found, if you need help please feel free to leave a question addressing your concern');
  })

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
    expect(global.alert).toHaveBeenCalledWith('One or more of the fields are empty');
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
    await fireEvent.change(bodyInput, {target: {value: 'This is a question'}});
    await fireEvent.change(nameInput, {target: {value: 'answerer'}});
    await fireEvent.change(emailInput, {target: {value: 'john@gmail.com'}})
    fireEvent.click(submitButton);
    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(axios.post).toHaveBeenCalledWith(process.env.API_URL + '/qa/questions', postData ,{headers: {Authorization:process.env.AUTH_SECRET} });
    expect(global.alert).toHaveBeenCalledWith('Successfully submitted!!! 🎉');
  })
});