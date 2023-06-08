import autoBind from 'react-autobind';
import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Dropzone from 'react-dropzone';

export default class AdminToolsPhotoDropzone extends Component {
  constructor(props, context) {
    super(props, context);

    autoBind(this);
  }

  render() {
    const {onFileSelected} = this.props;
    return (
      <div className="admin-tools-photo-dropzone settings-column">
        <Dropzone onDrop={onFileSelected} accept="image/*" multiple={false}>
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className="dropzone-area">
              <input {...getInputProps()} />
              <p>Drop an acceptable file type like .PNG or .JPEG or click to browse</p>
            </div>
          )}
        </Dropzone>
        <h5>Make a personal login by<br />adding your company logo</h5>
      </div>
    );
  }
}

AdminToolsPhotoDropzone.propTypes = {
  onFileSelected: PropTypes.func.isRequired,
};
