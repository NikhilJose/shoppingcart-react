import React, { Component } from "react";
import AdminService from "../services/admin-service";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: [],
    };
  }

  componentDidMount() {
    let arr = [];
    AdminService.getUsers().then(
      (response) => {
        arr = Object.values(response.data);
        for (let key in arr) {
          this.setState({
            content: [...this.state.content, arr[key]],
          });
        }
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  viewUser(id) {
    this.props.history.push(`/view-user/${id}`);
  }

  render() {
    return (
      <div className="container row">
        <div className="col-md-6">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.content.map((user) => (
                <tr key={user.id}>
                  {<td>{user.id}</td>}
                  {<td>{user.username}</td>}
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => this.viewUser(user.id)}
                    >
                      Show Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default User;
