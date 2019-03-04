import React, { Component } from 'react';
import { Link } from 'react-router';

const logins = 
<div>
    <div classNameName="overlay"></div>
    <div className="bg"></div>
    <div className="login-form">
        <form action="http://localhost:5000/auth/login" method="post">
            <h2 className="text-center">Sign in to the Photo Gallery</h2>		
            <div className="text-center social-btn">
                <a href="http://localhost:5000/auth/google" id="google" className="btn btn-danger btn-block"><i className="fa fa-google"></i> Sign in with <b>Google</b></a>
                <a href="http://localhost:5000/auth/twitter" id="twitter" className="btn btn-info btn-block"><i className="fa fa-twitter"></i> Sign in with <b>Twitter</b></a>
                <a href="http://localhost:5000/auth/github" id="github" className="btn btn-primary btn-block"><i className="fa fa-github"></i> Sign in with <b>Github</b></a>             
            </div>
        </form>     
            <div className="or-seperator"><i>or</i></div>
         <form action="http://localhost:5000/authent/login" method="post">   
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" name="username" placeholder="Username" required="required"></input>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" name="password" placeholder="Password" required="required"></input>
                </div>
            </div> 
            <div className="form-group">
                <button type="submit" className="btn btn-success btn-block login-btn">Sign in</button>
            </div>       
            <div className="or-seperator"><i>or sign up</i></div>
         </form> 

         <form action="http://localhost:5000/authent/signup" method="post"> 
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-user"></i></span>
                    <input type="text" className="form-control" name="username" placeholder="Username" required="required"></input>
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                    <input type="password" className="form-control" name="password" placeholder="Password" required="required"></input>
                </div>
            </div>           
            <div className="form-group">
                <button type="submit" className="btn btn-success btn-block login-btn">Sign up</button>
            </div>          
            
        </form>   
    </div>
</div>

export default logins;