/*eslint no-undef: "error"*/
import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ files, setFiles }) => {

  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    const validImages = selectedFiles.filter(file => file.type.startsWith('image/'));

    if (validImages.length !== selectedFiles.length) {
      alert('Only image files are allowed.');
      return;
    }

    for (let file of validImages) {
      const imageUrl = URL.createObjectURL(file);
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

FileUpload.propTypes = {
  files: PropTypes.array.isRequired,
  setFiles: PropTypes.func.isRequired,
};

export default FileUpload;
