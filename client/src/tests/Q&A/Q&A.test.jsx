/*global describe, it, expect*/
/*eslint no-undef: "error"*/
import React from 'react';
import {render} from '@testing-library/react';
import QA from '../../components/Q&A/QA.jsx';
import Question from '../../components/Q&A/Q&AComponents/Question.jsx'
import '@testing-library/jest-dom'
import '../../dist/output.css'
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';

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

  it('Should render question if given a question', () => {
    const question = render(
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
    )
  });
});