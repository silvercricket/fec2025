import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({ files, setFiles }) => {

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');

    try {
      const response = await axios.post(
        process.env.CLOUDINARY_URL,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      return null;
    }
  };

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));

    if (validImages.length !== selectedFiles.length) {
      alert('Only image files are allowed.');
      return;
    }

    for (let file of validImages) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        setFiles(prevFiles => [
          ...prevFiles,
          { file, thumbnail: imageUrl }
        ]);
      }
    }
  };
  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.file.name !== fileName));
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        disabled={files.length >= 5}
      />
      {files.length >= 5 && <p>You can only upload up to 5 images.</p>}

      <div>
        <h4>Selected Images:</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {files.map(({ file, thumbnail }) => (
            <div key={file.name}>
              <img
                src={thumbnail}
                alt={file.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <div>
                <button onClick={() => handleRemoveFile(file.name)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
