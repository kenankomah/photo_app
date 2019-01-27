import React, { Component } from 'react';
import { Link } from 'react-router';

const logins = 
<div>
    <div classNameName="overlay"></div>
    <div className="bg"></div>
    <div className="login-form">
        <form>
            <h2 className="text-center">Sign in to the Photo Gallery</h2>		
            <div className="text-center social-btn">
                <a href="http://localhost:5000/auth/google" id="google" className="btn btn-danger btn-block"><i className="fa fa-google"></i> Sign in with <b>Google</b></a>
                <a href="http://localhost:5000/auth/twitter" id="twitter" className="btn btn-info btn-block"><i className="fa fa-twitter"></i> Sign in with <b>Twitter</b></a>
                <a href="http://localhost:5000/auth/github" id="github" className="btn btn-primary btn-block"><i className="fa fa-github"></i> Sign in with <b>Github</b></a>             
            </div>
        </form>   
    </div>
</div>

export default logins;