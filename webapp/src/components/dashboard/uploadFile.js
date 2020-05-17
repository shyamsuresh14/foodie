import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";

class UploadFile extends Component {
    
    constructor(props)
    {
        super(props);
        this.state = {  
        isUploading: false,
        progress: 0,
        avatarURL: "",
        shopName:props.shopName,
        fid:props.fid,
        };
    }
 
  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => {
          this.props.updateURL(url);
          this.setState({ avatarURL: url })
        });
  };
 
  render() {
    return (
      <div style={{display: "flex", justifyContent: "center"}}>
          <label style={{marginRight: 10}}>Dish Image:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} width={50} height={50}/>}
          {
            !this.state.avatarURL && 
            <FileUploader
            accept="image/*"
            name="food"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />}
      </div>
    );
  }
}
 
export default UploadFile;