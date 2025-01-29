/*global describe, it, expect*/
/*eslint no-undef: "error"*/
import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QA from '../../components/Q&A/QA.jsx';
import Question from '../../components/Q&A/Q&AComponents/Question.jsx';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';
import Answers from '../../components/Q&A/Q&AComponents/Answers.jsx';
import SearchQuestions from '../../components/Q&A/Q&AComponents/SearchQuestions.jsx';

describe('Q&A',()=>{

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
      <Answers answers={[
        {
          "answer_id": 8,
          "body": "What a great question!",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 8,
          "photos": [],
        },
        {
          "answer_id": 5,
          "body": "Something pretty durable but I can't be sure",
          "date": "2018-01-04T00:00:00.000Z",
          "answerer_name": "metslover",
          "helpfulness": 5,
          "photos": [{
              "id": 1,
              "url": "urlplaceholder/answer_5_photo_number_1.jpg"
            },
            {
              "id": 2,
              "url": "urlplaceholder/answer_5_photo_number_2.jpg"
            },
            // ...
          ]
        },
        // ...
      ]}/>
    );

    expect(answers.getByTestId('answers')).toBeDefined();

    expect(answers.getAllByTestId('answer-body')).toHaveLength(2);

  });

  it('SearchQuestions should set inputs correctly', () => {
    const search = render(
      <Provider store={STORE}>
        <SearchQuestions/>
      </Provider>
    )
    const queryInput = search.getByTestId('query');
    const submitButton = search.getByTestId('search');
    userEvent.type(queryInput, 'query').then(() => {
      fireEvent.click(submitButton).then(() => {
        expect(queryInput).toHaveValue('query');
      });
    });
  })
});