import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class FileUpload extends Component {
  state = {
    selectedFile:null
  }

  showMessage = mode =>{
    var el;
    if(mode==="message"){
       el = document.getElementById('message-panel').style; 
      document.getElementById('preview-panel').style.display = "none";
    }else{
       el = document.getElementById('preview-panel').style; 
      document.getElementById('message-panel').style.display = "none";
    }
    
    el.display = "block";
    el.opacity = 0;
    let pos;

    (function fade_in() {
        pos = Number(el.opacity);
        pos += 0.01;
        el.opacity = pos;
        if ( pos < 1) {
            requestAnimationFrame(fade_in);
        }  
    })();    
  }
  
  fileSelectorHandler = event => {
    const messagePanel = document.getElementById('preview_image');
    this.showMessage("preview");

    messagePanel.innerHTML = '<b>' + event.target.files[0].name + '</b>' + ' selected';
    this.setState({
       selectedFile:event.target.files[0]
    })
  }

  filerClearer = () =>{
    this.setState({
      selectedFile:""
    });
  }

  closePanel = () =>{
    document.getElementById('message-panel').style.display ="none";   
    document.getElementById('preview-panel').style.display ="none"; 
    this.filerClearer();
  }
  
  fileUploadHandler = () => {
    this.showMessage("message"); 
    const messagePanel = document.getElementById('panel');    
    if(this.state.selectedFile){ 
        document.getElementById('panel').innerHTML = "";
        const img = document.createElement('img');
        const text = document.createTextNode("Uploading ");
        img.setAttribute('src','https://image-gallery1.s3.eu-west-2.amazonaws.com/myImage-1537648204973.gif');
        img.setAttribute('style','width:30px;');       
        messagePanel.appendChild(text);
        messagePanel.appendChild(img);        
       
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
            messagePanel.innerHTML = "8mb size limit!";
           }else if(res.data.msg === "Error: Images Only!"){
            messagePanel.innerHTML = "The file is not an image!";
           }else{
            messagePanel.innerHTML = "Done!";
           }
            this.filerClearer();
           // console.log(this.state.selectedFile);
           console.log(res.data.msg);
        }).catch(error => console.log(error));
    } else{
      messagePanel.innerHTML = "Select an image before uploading";      
    }
  }

  render() {
    return (
     
      <div>

        <input id="fileSelector"
        style={{display: 'none'}} 
        type="file" 
        onChange={this.fileSelectorHandler}
        ref={fileInput => this.fileInput = fileInput}/>
        
        <table id="select_pic" onClick={() => this.fileInput.click()}>
          <tbody>
          <tr>
            <td style={{textAlign:"center"}}>
              <svg className="select_pic_icon" x="0px" y="0px" viewBox="0 0 51.167 51.167" enable-background="new 0 0 1000 1000">
                <path d="M34.53,18.54H6.136C2.753,18.54,0,21.427,0,24.976v12.632c0,3.548,2.753,6.435,6.136,6.435H34.53
                  c3.383,0,6.136-2.887,6.136-6.435V24.976C40.666,21.427,37.913,18.54,34.53,18.54z M38.554,37.607c0,2.384-1.805,4.323-4.024,4.323
                  H6.136c-2.014,0-3.671-1.602-3.963-3.68c1.393-1.184,5.668-4.402,9.591-3.016c3.567,1.263,6.374-0.687,8.849-2.408
                  c1.784-1.241,3.469-2.413,5.372-2.538c4.971-0.327,12.45-0.002,12.525,0.001l0.044-0.999C38.554,29.29,38.554,37.607,38.554,37.607
                  z M38.554,28.288c-0.574-0.024-7.721-0.322-12.7,0.003c-2.458,0.162-4.453,1.55-6.383,2.893c-2.383,1.656-4.441,3.085-7.039,2.165
                  c-4.027-1.428-8.064,0.77-10.319,2.401V24.976c-0.001-2.384,1.804-4.323,4.023-4.323H34.53c2.219,0,4.024,1.938,4.024,4.322
                  C38.554,24.975,38.554,28.288,38.554,28.288z M46.001,18.957v19.667c0,0.553-0.447,1-1,1s-1-0.447-1-1V18.957c0-2.206-1.794-4-4-4
                  H8.668c-0.553,0-1-0.447-1-1s0.447-1,1-1h31.333C43.31,12.957,46.001,15.648,46.001,18.957z M51.167,13.124v19.667
                  c0,0.553-0.447,1-1,1s-1-0.447-1-1V13.124c0-2.206-1.794-4-4-4H13.834c-0.553,0-1-0.447-1-1s0.447-1,1-1h31.333
                  C48.476,7.124,51.167,9.815,51.167,13.124z M8.668,22.374c-2.159,0-3.916,1.757-3.916,3.916s1.757,3.916,3.916,3.916
                  s3.916-1.757,3.916-3.916S10.827,22.374,8.668,22.374z M8.668,28.206c-1.057,0-1.916-0.859-1.916-1.916s0.859-1.916,1.916-1.916
                  c1.057,0,1.916,0.859,1.916,1.916S9.725,28.206,8.668,28.206z"/>
              </svg>  
            </td>
          </tr>
          <tr><td className="labelled-cell" style={{textAlign:"center"}}>Select Photo</td></tr>
          </tbody>
        </table>
        

        <table id="upload" onClick={this.fileUploadHandler}>
        <tbody>
        <tr><td style={{textAlign:"center"}}><svg  className="upload_icon" viewBox="0 0 384.97 384.97">
            <path d="M372.939,264.641c-6.641,0-12.03,5.39-12.03,12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03
                    S0,270.031,0,276.671v96.242c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03v-96.242
                    C384.97,270.019,379.58,264.641,372.939,264.641z"/>
            <path d="M117.067,103.507l63.46-62.558v235.71c0,6.641,5.438,12.03,12.151,12.03c6.713,0,12.151-5.39,12.151-12.03V40.95
                    l63.46,62.558c4.74,4.704,12.439,4.704,17.179,0c4.74-4.704,4.752-12.319,0-17.011l-84.2-82.997
                    c-4.692-4.656-12.584-4.608-17.191,0L99.888,86.496c-4.752,4.704-4.74,12.319,0,17.011
                    C104.628,108.211,112.327,108.211,117.067,103.507z"/>
        </svg></td></tr>
        <tr><td className="labelled-cell" style={{textAlign:"center"}}>Upload</td></tr>
        </tbody>
       </table>
        <div id="message-panel">  
          <img className="close_panel" src="../assets/close.png" alt="close" onClick={this.closePanel}></img>     
          <span id="panel"></span>
        </div>  
        <div id="preview-panel">
          <img className="close_panel" src="../assets/close.png" alt="close" onClick={this.closePanel}></img>
          <table>
              <tbody>
                  <tr><td> Selected image preview</td></tr>
                  <tr><td> <img src="https://i.pinimg.com/736x/cd/90/d9/cd90d9de63fa2c8e5c5e7117e27b5c18--gritty-portrait-photography-studio-photography.jpg"></img></td> </tr> 
                  <tr><td> <span id="preview_image">Andromeda.jpg</span></td></tr>
              </tbody>
          </table>
        </div>   
      </div>
      
    );
  }
}

export default FileUpload;
