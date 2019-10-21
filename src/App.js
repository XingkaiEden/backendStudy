import React, { Component } from "react";
import { ToastContainer } from 'react-toastify';
import http from "./services/httpServices";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css"
import "./App.css";




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


    // const promise = axios.get(config.apiEndPoint);
    // const respones = await promise;
    //  this.setState({ posts: respones.data })
    // or simplify it:

    const { data: posts } = await http.get(config.apiEndPoint);
    this.setState({ posts });

  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" }
    const { data: post } = await http.post(config.apiEndPoint, obj);
    // You post the new object into server, but not update it in our state yet

    //update:

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
    // in the network section of Chrome, there are two posts, the first one with Request Method: OPTIONS
    //reason is our project is hosted on local, but server is held on another domain.
    // for security reason, browser always send it when you have two different domains

  };

  handleUpdate = async post => {
    //axios.put(): put entire data into server
    //axios.patch(): put one or more data into server
    //for example, put() need to post the entire post object
    // but patch() can just post the "title" property of the object
    post.title = "UPDATE1"; // update the title in memory
    await http.put(`${config.apiEndPoint}/${post.id}`, post); // put update to server


    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
    //mistake I made: 
    //1. forgot to add await and async, which cause data is undefined
    //2. posts[index] = { ...post }; represents the spreaded object:
    //{userId: 1, id: 1, title: "UPDATE", 
    //body: "quia et suscipit↵suscipit recusandae consequuntur 
    //…strum rerum est autem sunt rem eveniet architecto"}
    // However, posts[index] = {post } represents the post object which did not be spreaded
    // we want the spreaded on here

  };

  handleDelete = async post => {
    // await axios.delete(`${config.apiEndPoint}/${post.id}`);//delete it from server
    // //QUESTION: why we not get the new data from server
    // // const posts = await axios.get(config.apiEndPoint);
    // //here is why: sometime you want to delete if first and then call the server
    // // it gives user better experience due to no delay for users

    // const posts = this.state.posts.filter(p => p.id !== post.id);
    // this.setState({ posts });

    const originalPosts = this.state.posts;
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      await http.delete(`${config.apiEndPoint}/${post.id}`);

    }
    catch (error) {
      // expect and unexpect errors
      // we need to catch them all
      // request(to server); response(from server)
      if (error.response && error.response.status === 404) {
        console.log(error)
        alert("this post has been delete already")
      }
      // if (error.response && error.response.status === 404) {
      //   console.log(error)
      //   alert("this post has been delete already")
      // } else {
      //   console.log(error)
      //   alert("something happend and can't delete the post");
      // }
      this.setState({ posts: originalPosts });
    }// try this with disconnect the wifi

    //mistake I made here:
    // due to originalPost has different name 
    // you have to notify .setState() which object you want to change
    // before is: {posts:posts}, after is {posts:originalPosts}


    //YOU WANT TO HANDLE ERRORS IN ALL METHOD, THEN USE INTERCEPTORS, TOP OF THIS PAGE
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
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
