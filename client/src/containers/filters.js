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
            document.querySelectorAll('#filter-table td')[11].innerText = Math.ceil(contrast.value/2) + "%";
            document.querySelectorAll('#filter-table td')[14].innerText = brightness.value + "%";
            document.querySelectorAll('#filter-table td')[17].innerText =  Math.ceil(huerotate.value/3.6) + " %";
            document.querySelectorAll('#filter-table td')[20].innerText = saturate.value + "%";
            document.querySelectorAll('#filter-table td')[23].innerText = blur.value * 2 + "%";
        };

        
        // document.querySelector('button').addEventListener("click", function(){
        filterReset(){
                const img = document.querySelector('#filter-container img');
            document.querySelectorAll('#filter-table td')[2].innerText = 0 + "%";
            document.querySelectorAll('#filter-table td')[5].innerText = 0 + "%";
            document.querySelectorAll('#filter-table td')[8].innerText = 0 + "%";
            document.querySelectorAll('#filter-table td')[11].innerText = 50 + "%";
            document.querySelectorAll('#filter-table td')[14].innerText = 50 + "%";
            document.querySelectorAll('#filter-table td')[17].innerText =  0 + " %";
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

        // })
    }

    //addFilter();

    render(){
        return(
            <div id="filter-settings">
                <div id="nav-bar">
                    <Upload />
                    <Profile />            
                </div> 


                <Link to="/list">
                    <button className="center-block btn btn-primary" id="back-to-main"> Back to main image</button>
                </Link>
                
                
                <div id="filter-container">
                <div className="filter-box">
                    <img src={this.props.image.src} /> <br/><br/>
                </div>

                <div id="sliders" onInput = {() =>this.addFilter()}>
                
                    <p id="filter-box">Image filters</p> 
                    <table id="filter-table">
                        <tr>
                            <td>Grayscale</td>
                            <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="grayscale"/></td> 
                            <td className="scale">0%</td> 
                        </tr>
                        <tr>
                            <td>Invert</td>
                            <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="invert"/> </td>
                            <td className="scale">0%</td> 
                        </tr>
                        <tr>
                            <td>Sepia</td>
                            <td><input type="range" min="0" max="100" defaultValue="0" className="slider" id="sepia"/> </td>
                            <td className="scale">0%</td> 
                        </tr>
                        <tr>
                            <td>Contrast</td>
                            <td><input type="range" min="0" max="200" defaultValue="100" className="slider" id="contrast"/> </td>
                            <td className="scale">50%</td> 
                        </tr>
                        <tr>
                            <td>Brightness</td>
                            <td><input type="range" min="0" max="100" defaultValue="50" className="slider" id="brightness"/> </td>
                            <td className="scale">50%</td> 
                        </tr>
                        <tr>
                            <td>Huerotate</td>
                            <td><input type="range" min="0" max="360" defaultValue="0" className="slider" id="huerotate"/> </td>
                            <td className="scale">0%</td> 
                        </tr>
                        <tr>
                            <td>Saturate</td>
                            <td><input type="range" min="0" max="100" defaultValue="20" className="slider" id="saturate"/> </td>
                            <td className="scale">20%</td> 
                        </tr>
                        <tr>
                            <td>blur</td>
                            <td><input type="range" min="0" max="50" defaultValue="0" className="slider" id="blur"/> </td>
                            <td className="scale">0%</td> 
                        </tr>

                    </table> 
                    <button onClick = {() =>this.filterReset()}>Reset</button>  
                </div>
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