import React, { Component } from "react";
import AdminService from "../services/admin-service";

class Viewuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    AdminService.getUser(this.props.match.params.id).then((response) => {
      this.setState({ user: response.data });
    });
  }
  render() {
    const { 
      username, 
      email, 
      roles: [
        { name } = {}
      ] = [] 
    } = this.state.user;

    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> View User Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Usename: </label>
              <div> {username}</div>
            </div>
            <div className="row">
              <label> Email: </label>
              <div> {email}</div>
            </div>
            <div className="row">
              <label> Role: </label>
              <div>{name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewuser;
