import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class FileUpload extends Component {
  state = {
    selectedFile:null
  }
  
  fileSelectorHandler = event => {
    //console.log(event.target.files[0]);
    document.querySelector('span').innerHTML = event.target.files[0].name + ' selected';
    this.setState({
       selectedFile:event.target.files[0]
    })
  }

  filerClearer = () =>{
    this.setState({
      selectedFile:""
    });
  }
  
  fileUploadHandler = () => {
    
    if(this.state.selectedFile){       
        document.querySelector('span').innerHTML = "";
        const img = document.createElement('img');
        const text = document.createTextNode("Uploading ");
        img.setAttribute('src','https://image-gallery1.s3.eu-west-2.amazonaws.com/myImage-1537648204973.gif');
        img.setAttribute('style','width:30px;');       
        document.querySelector('span').appendChild(text);
        document.querySelector('span').appendChild(img);        
       
        const fd = new FormData();
        fd.append('myImage', this.state.selectedFile, this.state.selectedFile.name);
        axios.post('http://localhost:5000/upload',fd,{
            onUploadProgress: progressEvent => {
               // console.log('Upload progress: ' + ((progressEvent.loaded * 100)/progressEvent.total) + '%');
            },
            withCredentials: true
        })
        .then(res => {
           // console.log(res);
           if(res.data.msg.code === "LIMIT_FILE_SIZE"){
            document.querySelector('span').innerHTML = "8mb size limit!";
           }else if(res.data.msg === "Error: Images Only!"){
            document.querySelector('span').innerHTML = "The file is not an image!";
           }else{
            document.querySelector('span').innerHTML = "Done!";
           }
            this.filerClearer();
           // console.log(this.state.selectedFile);
           console.log(res.data.msg);
        }).catch(error => console.log(error));
    } else{
      document.querySelector('span').innerHTML = "Select an image before uploading";      
    }
  }

  render() {
    return (
      <div className='App'>

        <input id="fileSelector"
        style={{display: 'none'}} 
        type="file" 
        onChange={this.fileSelectorHandler}
        ref={fileInput => this.fileInput = fileInput}/>

        <button onClick={() => this.fileInput.click()}>Select an image</button>
        <button id="uploader" onClick={this.fileUploadHandler}>Upload</button><br />
        
      </div>
    );
  }
}

export default FileUpload;
