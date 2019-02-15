import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Blogs from '../api/blogs';

class Blog extends Component {
    handleSubmit(event) {
        event.preventDefault();

        // Find the text field via the React ref
        const name = ReactDOM.findDOMNode(this.refs.textInputName).value.trim();
        const description = ReactDOM.findDOMNode(this.refs.textInputDescription).value.trim();

        Blogs.insert({
            name,
            description,
            createdAt: new Date(), // current time
        });

        // Clear form
        ReactDOM.findDOMNode(this.refs.textInputName).value = '';
        ReactDOM.findDOMNode(this.refs.textInputDescription).value = '';
    }

    // state = {
    //   counter: 0,
    // }
    //
    // increment() {
    //   this.setState({
    //     counter: this.state.counter + 1
    //   });
    // }

    render() {
        const blogs = this.props.blogs.map(
            blog => this.makeBlog(blog)
        );
        return (
            <div>

                <form className="new-blogs" onSubmit={this.handleSubmit.bind(this)} >
                    <div>
                        <input
                            type="text"
                            ref="textInputName"
                            placeholder="Type to add new name"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            ref="textInputDescription"
                            placeholder="Type to add new description"
                        />
                    </div>
                    <input type="submit" value="Submit" />
                </form>

                <h5>Read My blogs!</h5>
                <div>{ blogs }</div>
            </div>
        );
    }

    makeBlog(blog) {
        return (
            <div key={blog._id}>
                <h5>
                    {blog.name}
                </h5>
                <p>
                    {blog.description}
                </p>
            </div>
        )
    }
}

export default  BlogContariner = withTracker(() => {
    return {
        blogs: Blogs.find().fetch(),
    };
})(Blog);
