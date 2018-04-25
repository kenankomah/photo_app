import React, { Component } from 'react';
import {connect} from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

class BookList extends Component {
  renderList(){
    return this.props.books.map((book) => {
     return (

    /*   <Link to="list" key={book.title} >
        <li
          key={book.title}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item">
          {book.title}
        </li>
       </Link>

*/

       <div key={book.title} className="col-xs-6 col-sm-3">
          <Link to="list"
             onClick={() => this.props.selectBook(book)}>
             <img width="100%" src={book.title} />
          </Link>
       </div>



      );
    });
  }

  render(){
    return (
      <div className="container">
        <h1>Gallery</h1>
        <div className="row grid">
          {this.renderList()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  //Whatever is returned from here will show up as props
  //inside of BookList;
  return {
    books: state.books
  };
}

//Anything returned from this function will end up as props on the BookList container
function mapDispatchToProps(dispatch){ //second selectBook is the one that was imported above.
  //Whenever selectBook is called the result should be passed to all of our reducers
  return bindActionCreators({ selectBook: selectBook}, dispatch);
}
//the dispatch gets the results of the selectBook (i.e. the action) call and spits it back out to all the reducers in the application.


//To promote BookList from a component to a container - it needs to know about this new dispatch method, selectBook.
//To make it available as a prop.
export default connect(mapStateToProps, mapDispatchToProps)(BookList);
//Highly recommends referencing the react-redux documentation
