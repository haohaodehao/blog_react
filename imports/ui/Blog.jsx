import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Blogs from '../api/blogs';

class Blog extends Component {
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
                <p>Read My blogs!</p>
                <div>{ blogs }</div>
            </div>
        );
    }

    makeBlog(blog) {
        return (
            <div key={blog._id}>
                <p>
                    {blog.name}
                </p>
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
