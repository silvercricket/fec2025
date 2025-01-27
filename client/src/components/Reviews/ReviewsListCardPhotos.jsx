import React from 'react';

const ReviewsListCardPhotos = ({ photo }) => {
  console.log('photo: ', photo);
    return (
      <img src={photo.url}/>
  )

}


export default ReviewsListCardPhotos;