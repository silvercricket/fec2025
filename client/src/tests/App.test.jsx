
import React from 'react';
import {render} from '@testing-library/react';
import App from '../components/App.jsx';
import '@testing-library/jest-dom'
import STORE from '../store/Store.js';
import {Provider} from 'react-redux';

describe('App',()=>{

  it('Should render app and the four main components', () => {
    const Apple = render(
      <Provider store={STORE}>
        <App/>
      </Provider>
    );

    expect(Apple.getByTestId('app')).toBeDefined();

    expect(Apple.getByTestId('overview')).toBeDefined();

    expect(Apple.getByTestId('similar')).toBeDefined();

    expect(Apple.getByTestId('qa')).toBeDefined();

    expect(Apple.getByTestId('review')).toBeDefined();
  });

});