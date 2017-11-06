import React, { Component } from 'react';
// In order for the component to call the saveComment action creator, it needs to be a container
import { connect } from 'react-redux';
// Shortcut for mapDispatchToProps: save all action creators in "actions".
// Overkill if you only need a few of many action creators.
// Now you can pass it in below inside "connect" function
import * as actions from '../actions';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { comment: '' };
  }

  handleChange(event) {
    this.setState({ comment: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.saveComment(this.state.comment);
    this.setState({ comment: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="comment-box">
        <h4>Add a comment</h4>
        <textarea
          value={this.state.comment}
          onChange={this.handleChange.bind(this)}
        />
        <div>
          <button action="submit">Submit Comment</button>
        </div>
      </form>
    );
  }
}

// This component doesn't need any new info when used,
// so 1st arg--piece of state--is null, &
// 2nd arg binds all action creators to the CommentBox class/container.
export default connect(null, actions)(CommentBox);
