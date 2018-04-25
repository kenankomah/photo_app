import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';


class BookDetail extends Component {
  render(){
    if(!this.props.books){
      return <div>Select a book to get started.</div>
    }

    return (
      <div className="container details">
         <Link to="/">
          <button className="center-block btn btn-primary"> Back to gallery</button>
         </Link>
          <div className="row">
            <div height="50px;" className="span4"></div>
            <div className="span4"><img className="center-block"  width="70%" src={this.props.books.title} /></div>
            <div className="span4 text-center" id="date">Date added:{this.props.books.pages}</div>
          </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.activeBook
  };
}

export default connect(mapStateToProps)(BookDetail);
