/*global describe, it, expect, beforeEach, jest, process*/
/*eslint no-undef: "error"*/
import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import '../../dist/output.css';
import STORE from '../../store/Store.js';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import Reviews from '../../components/Reviews/Reviews.jsx';
import axios from 'axios';
import ProductSlice from '../../store/ProductSlice.js';
import ReviewsSlice from '../../store/ReviewsSlice.js';
import ReviewsMetaSlice from '../../store/ReviewsMetaSlice.js';

jest.mock('axios');
jest.mock('../../components/Reviews/StarRatings', () => {
  return function StarRatings() {
    return <div>star ratings</div>;
  }
});

beforeEach(() => {
  jest.clearAllMocks()
});
describe('Review',()=>{

  it('Should render all non-conditional components of Review', async () => {
    const Review = await render(
      <Provider store={STORE}>
        <Reviews />
      </Provider>
    );

    expect(Review.getByTestId('list-view')).toBeDefined();
  });
});

describe('Review\'s Components', () => {
  it('Should display data from Redux store', async () => {

    const mockProduct = [
      {
        "id": 1,
        "name": "Camo Onesie",
        "slogan": "Blend in to your crowd",
        "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
        "category": "Jackets",
        "default_price": "140"
      }
    ];

    const mockReviewsData = {
      "product": "2",
      "page": 0,
      "count": 5,
      "results": [
        {
          "review_id": 3,
          "rating": 4,
          "summary": "I am liking these glasses",
          "recommend": false,
          "response": "Glad you're enjoying the product!",
          "body": "They are very dark. But that's good because I'm in very sunny spots",
          "date": "2019-06-23T00:00:00.000Z",
          "reviewer_name": "bigbrotherbenjamin",
          "helpfulness": 5,
          "photos": [],
        },
      ]
    };

    const mockReviewsMetaData = {
      "product_id": "2",
      "ratings": {
        4: 2,
      },
      "recommended": {
        0: 5
      },
      "characteristics": {
        "Size": {
          "id": 14,
          "value": "4.0000"
        }
      }
    }

    const mockStore = configureStore({
      reducer: {
        Product: ProductSlice.reducer,
        ReviewsData: ReviewsSlice.reducer,
        ReviewsMeta: ReviewsMetaSlice.reducer
      },
      preloadedState: {
        Product: {id: 40344 },
        ReviewsData: {
          "product": "2",
          "page": 0,
          "count": 5,
          "results": [{ review_id: 1}, { review_id: 2}]
        },
        ReviewsMeta: { product_id: 2 }
      }
    });

    axios.get.mockResolvedValueOnce({ data: mockProduct });
    axios.get.mockResolvedValueOnce({ data: mockReviewsData });
    axios.get.mockResolvedValueOnce({ data: mockReviewsMetaData });
    let Review;
    await act(async () => {
      Review = render(
        <Provider store={mockStore}>
        <Reviews />
      </Provider>
    )});


    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));

    await waitFor(() => expect(axios.get).toHaveBeenCalledWith(process.env.API_URL + `/reviews/`,{params: {
      "page": 1,
      "product_id": 40344,
      "sort": "relevant",
    },
    headers: {
      Authorization:process.env.AUTH_SECRET
    } }));

    await waitFor(() => expect(Review.getByTestId('review-view')).toBeDefined());

  });
});