import React, { Component } from "react";
import axios from 'axios';
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";
class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    //fist call is pending due to the delay
    // then either resolve or reject
    // there are two inner properties
    // there is a data property for second inner property
    // if you want get the data, you have to use "await" async function or the old way promise.then()


    // const promise = axios.get(apiEndPoint);
    // const respones = await promise;
    //  this.setState({ posts: respones.data })
    // or simplify it:

    const { data: posts } = await axios.get(apiEndPoint);
    this.setState({ posts });

  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" }
    const { data: post } = await axios.post(apiEndPoint, obj);
    // You post the new object into server, but not update it in our state yet

    //update:

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    // in the network section of Chrome, there are two posts, the first one with Request Method: OPTIONS
    //reason is our project is hosted on local, but server is held on another domain.
    // for security reason, browser always send it when you have two different domains

  };

  handleUpdate = post => {
    //axios.put(): put entire data into server
    //axios.patch(): put one or more data into server
    //for example, put() need to post the entire post object
    // but patch() can just post the "title" property of the object
    //post
  };

  handleDelete = post => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
