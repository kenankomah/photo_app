import React, {Component} from 'react';
import {connect} from 'react-redux';
import Upload from './upload';
import Profile from './profile';
import { Link } from 'react-router';



class ImageFilter extends Component {

    addFilter(){ 
        const img = document.querySelector('#filter-container img');

        const grayscale = document.getElementById("grayscale"); 
        const invert = document.getElementById("invert");    
        const sepia = document.getElementById("sepia"); 
        const contrast = document.getElementById("contrast"); 
        const brightness = document.getElementById("brightness");    
        const huerotate = document.getElementById("huerotate"); 
        const saturate = document.getElementById("saturate"); 
        const blur = document.getElementById("blur"); 


        const grey = "grayscale(" + grayscale.value + "%" + ")";
        const inv = "invert(" + invert.value + "%" + ")";
        const sep = "sepia(" + sepia.value + "%" + ")";
        const cont = "contrast(" + contrast.value + "%" + ")";
        const bright = "brightness(" + brightness.value /50 + ")";
        const hue = "hue-rotate(" + huerotate.value + "deg" + ")";
        const sat = "saturate(" + saturate.value/20 + ")";
        const blu = "blur(" + blur.value/10 + "px" + ")";

        img.style.filter = grey + inv + sep + cont + bright + hue + sat + blu; 

        document.querySelectorAll('#filter-table td')[2].innerText = grayscale.value + "%";
        document.querySelectorAll('#filter-table td')[5].innerText = invert.value + "%";
        document.querySelectorAll('#filter-table td')[8].innerText = sepia.value + "%";
        document.querySelectorAll('#filter-table td')[11].innerText = (contrast.value/2).toFixed(0) + "%";
        document.querySelectorAll('#filter-table td')[14].innerText = brightness.value + "%";
        document.querySelectorAll('#filter-table td')[17].innerText =  (huerotate.value/3.6).toFixed(0) + "%";
        document.querySelectorAll('#filter-table td')[20].innerText = saturate.value + "%";
        document.querySelectorAll('#filter-table td')[23].innerText = blur.value * 2 + "%";
    };

    
    filterReset(){
        console.log(this.props.image);
        const img = document.querySelector('#filter-container img');
        document.querySelectorAll('#filter-table td')[2].innerText = 0 + "%";
        document.querySelectorAll('#filter-table td')[5].innerText = 0 + "%";
        document.querySelectorAll('#filter-table td')[8].innerText = 0 + "%";
        document.querySelectorAll('#filter-table td')[11].innerText = 50 + "%";
        document.querySelectorAll('#filter-table td')[14].innerText = 50 + "%";
        document.querySelectorAll('#filter-table td')[17].innerText =  0 + "%";
        document.querySelectorAll('#filter-table td')[20].innerText = 20 + "%";
        document.querySelectorAll('#filter-table td')[23].innerText = 0 + "%";


        document.querySelectorAll("input[type=range]")[0].value = 0;
        document.querySelectorAll("input[type=range]")[1].value = 0;
        document.querySelectorAll("input[type=range]")[2].value = 0;
        document.querySelectorAll("input[type=range]")[3].value = 100;
        document.querySelectorAll("input[type=range]")[4].value = 50;
        document.querySelectorAll("input[type=range]")[5].value = 0;
        document.querySelectorAll("input[type=range]")[6].value = 20;
        document.querySelectorAll("input[type=range]")[7].value = 0;
        
        img.style.filter = "none";
     }

      updateImage(imageId){
        const imgfilter = document.querySelector('#filter-container img').style.filter; 

        const post = {
           filter:imgfilter
        }
    
         const update = () => {
            const options = {
            method:'PUT',
            body: JSON.stringify(post),
            headers: new Headers({
              'Content-Type':'application/json'
            })
          }
          
          return fetch('http://localhost:5000/image/'+ imageId, options)
          .then(res => res.json())
          .then(res => console.log(res))
          .catch(error => console.log(error))
        }
        update();
        setTimeout(()=>{window.location.assign('/');},1000);
      }

      componentDidMount(){
        const filter = this.props.image.filter;
        document.querySelectorAll('#filter-table td')[2].innerText = filter.split(' ')[0].replace(/[^0-9.]/g,"") + "%";
        document.querySelectorAll('#filter-table td')[5].innerText = filter.split(' ')[1].replace(/[^0-9.]/g,"") + "%";
        document.querySelectorAll('#filter-table td')[8].innerText = filter.split(' ')[2].replace(/[^0-9.]/g,"") + "%";
        document.querySelectorAll('#filter-table td')[11].innerText = filter.split(' ')[3].replace(/[^0-9.]/g,"")/2 + "%";
        document.querySelectorAll('#filter-table td')[14].innerText = (filter.split(' ')[4].replace(/[^0-9.]/g,"")/2)*100 + "%";
        document.querySelectorAll('#filter-table td')[17].innerText =  ((filter.split(' ')[5].replace(/[^0-9.]/g,"")/360)*100).toFixed(0) + "%";
        document.querySelectorAll('#filter-table td')[20].innerText = ((filter.split(' ')[6].replace(/[^0-9.]/g,"")/5)*100).toFixed(0) + "%";
        document.querySelectorAll('#filter-table td')[23].innerText = filter.split(' ')[7].replace(/[^0-9.]/g,"") * 20 + "%";


        document.querySelectorAll("input[type=range]")[0].value = filter.split(' ')[0].replace(/[^0-9.]/g,"");
        document.querySelectorAll("input[type=range]")[1].value = filter.split(' ')[1].replace(/[^0-9.]/g,"");
        document.querySelectorAll("input[type=range]")[2].value = filter.split(' ')[2].replace(/[^0-9.]/g,"");
        document.querySelectorAll("input[type=range]")[3].value = filter.split(' ')[3].replace(/[^0-9.]/g,"");
        document.querySelectorAll("input[type=range]")[4].value = (filter.split(' ')[4].replace(/[^0-9.]/g,"")/2)*100;
        document.querySelectorAll("input[type=range]")[5].value = filter.split(' ')[5].replace(/[^0-9.]/g,"");
        document.querySelectorAll("input[type=range]")[6].value = (filter.split(' ')[6].replace(/[^0-9.]/g,"")/5)*100;
        document.querySelectorAll("input[type=range]")[7].value = filter.split(' ')[7].replace(/[^0-9.]/g,"") * 10;
     }   

 
    render(){
        return(
            <div id="filter-settings">
                <div id="nav-bar">
                    <Upload />
                    <Profile />            
                </div> 

                
                <div id="filter-container">
                    <Link to="/list">
                        <button className="center-block btn btn-primary" id="back-to-main"> Back to main image</button>
                    </Link>
                    <button className="btn btn-success"id="reset" onClick = {() =>this.filterReset()}>Reset</button>  
                    <div className="filter-box">
                        <img src={this.props.image.src} style={{filter:this.props.image.filter}} /> <br/><br/>
                    </div>

                    <div id="sliders" onInput = {() =>this.addFilter()}>
                    
                        <p id="filter-box">Image filters</p> 
                        <table id="filter-table">
                            <tr>
                                <td className="filter-name">Grayscale</td>
                                <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="grayscale"/></td> 
                                <td className="scale">0%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Invert</td>
                                <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="invert"/> </td>
                                <td className="scale">0%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Sepia</td>
                                <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="sepia"/> </td>
                                <td className="scale">0%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Contrast</td>
                                <td><input type="range" min="0" max="200" defaultValue="100" className="slider" id="contrast"/> </td>
                                <td className="scale">50%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Brightness</td>
                                <td><input type="range" min="0" max="100" defaultValue="50" className="slider" id="brightness"/> </td>
                                <td className="scale">50%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Huerotate</td>
                                <td><input type="range" min="0" max="360" defaultValue="0" className="slider" id="huerotate"/> </td>
                                <td className="scale">0%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">Saturate</td>
                                <td><input type="range" min="0" max="100" defaultValue="20" className="slider" id="saturate"/> </td>
                                <td className="scale">20%</td> 
                            </tr>
                            <tr>
                                <td className="filter-name">blur</td>
                                <td><input type="range" min="0" max="50" defaultValue="0" className="slider" id="blur"/> </td>
                                <td className="scale">0%</td> 
                            </tr>

                        </table> 
                        
                    </div>
                    <button type="button" className="btn btn-primary" id ="update" type="submit" onClick={() =>this.updateImage(this.props.image.id)} > Save changes </button>
                </div>      
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      image: state.activeImage
    };
}


export default connect(mapStateToProps)(ImageFilter);





