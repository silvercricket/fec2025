/*global describe, it, expect*/
/*eslint no-undef: "error"*/
import React from 'react';
import {render} from '@testing-library/react';
import QA from '../../components/Q&A/QA.jsx';
import '@testing-library/jest-dom'
import '../../dist/output.css'
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';

describe('Q&A',()=>{

  it('Should render all components of QA', () => {
    const Q_A = render(
      <Provider store={STORE}>
        <QA/>
      </Provider>
    );
    console.log('here');

    expect(Q_A.getByTestId('search-questions')).toBeDefined();

    expect(Q_A.getByTestId('questions')).toBeDefined();

    expect(Q_A.getByTestId('create-question')).toBeDefined();
  });

});