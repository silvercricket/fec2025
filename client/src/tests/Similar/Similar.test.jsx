import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import Similar from '../../components/Similar/similar.jsx';
import Carousel from '../../components/Similar/Carousel.jsx';
import Compare from '../../components/Similar/Compare.jsx';
import Outfit from '../../components/Similar/Outfit.jsx';

describe('Similar', () => {

  it('Should render all non-conditional components of Similar component', () => {
    const Related = render(
      <Provider store={STORE}>
        <Similar />
      </Provider>
    );

    expect(Related.getByTestId('similar')).toBeDefined();

  });
});

