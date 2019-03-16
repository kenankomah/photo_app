import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


//const Profile = () => { 

class Profile extends Component {    
    loggout(){
        document.cookie = "gallery_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    } 
      
    render() {
        //selects just the first name
        if(this.props.activeUser.username){
            this.props.activeUser.username = this.props.activeUser.username.split(" ")[0];
        }
      
        
        return (
            <div>
                <table id="profile">
                    <tbody>
                        <tr><td style={{textAlign:"center"}}><img id="profile-pic" src={this.props.activeUser.thumbnail}/> </td> </tr>        
                        <tr><td className="labelled-cell" style={{textAlign:"center"}}>{this.props.activeUser.username}</td> </tr>
                    </tbody>
                </table>

                <table id="sign_out">
                    <tbody>
                        <tr><td style={{textAlign:"center"}}><a onClick={this.loggout} href="http://localhost:5000/auth/logout"><svg className="sign_out_icon" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000">
                            <g><path d="M143.6,544.5c0-131.9,71.7-247.1,178.2-308.7v-99.8C164.5,204.8,54.5,361.9,54.5,544.5C54.5,790.6,254,990,500,990s445.5-199.4,445.5-445.5c0-182.7-110-339.8-267.3-408.5v99.8c106.5,61.6,178.2,176.8,178.2,308.7c0,196.8-159.5,356.4-356.4,356.4S143.6,741.4,143.6,544.5z M500,10c-49.2,0-89.1,39.9-89.1,89.1v356.4c0,49.2,39.9,89.1,89.1,89.1c49.2,0,89.1-39.9,89.1-89.1V99.1C589.1,49.9,549.2,10,500,10z"/></g>
                            </svg></a></td></tr>
                        <tr><td className="labelled-cell" style={{textAlign:"center"}}>Sign Out</td></tr>
                    </tbody>
                </table>
            </div>   
        ); 
    }       
}

//export default Profile;

function mapStateToProps(state) {
    console.log(state.activeUser);
    return {     
      activeUser: state.activeUser
    };
  }
  
export default connect(mapStateToProps)(Profile);

