import React, { useState, useEffect } from "react";
import AdminService from "../services/admin-service";
import CreateProduct from "./create-product";

/** fetching data using hooks  */

const Product = (props) => {
  const [products, setProducts] = useState([]);
  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await AdminService.getProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  const toggle = () => {
    setIsToggled(isToggled === false ? true : false);
  };

  const editProduct = (id) => {
    props.history.push(`/edit-product/${id}`);
  };

  const viewProduct = (id) => {
    props.history.push(`/view-product/${id}`);
  };

  const deleteProduct = (id) => {
    AdminService.deleteProduct(id).then(() => {
      window.location.reload();
    });
  };

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={toggle}>
        Add Product
      </button>
      <div className="container row" style={{ marginTop: "30px" }}>
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
              {products.map((product) => (
                <tr key={product.id}>
                  {<td>{product.id}</td>}
                  {<td>{product.name}</td>}
                  <td>
                    <button
                      onClick={() => editProduct(product.id)}
                      className="btn btn-info"
                    >
                      Edit
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteProduct(product.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => viewProduct(product.id)}
                      className="btn btn-info"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-6">{isToggled ? <CreateProduct /> : null}</div>
      </div>
    </div>
  );
};
export default Product;

/** fetching data without using hooks or redux */

// import React, { Component } from "react";
// import AdminService from "../services/admin-service";
// import CreateProduct from "./create-product";

// class Product extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: [],
//       toggle: false,
//     };
//   }
//   componentDidMount() {
//     let arr = [];
//     AdminService.getProducts().then(
//       (response) => {
//         arr = Object.values(response.data);
//         for (let key in arr) {
//           this.setState({
//             content: [...this.state.content, arr[key]],
//           });
//         }
//       },
//       (error) => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString(),
//         });
//       }
//     );
//   }

//   handleClick() {
//     this.setState((prevState) => ({ toggle: !prevState.toggle }));
//   }

//   editProduct(id) {
//     this.props.history.push(`/edit-product/${id}`);
//   }

//   viewProduct(id) {
//     this.props.history.push(`/view-product/${id}`);
//   }

//   deleteProduct(id) {
//     AdminService.deleteProduct(id).then(() => {
//       window.location.reload();
//     });
//   }

//   render() {
//     return (
//       <div>
//         <button
//           type="button"
//           className="btn btn-primary"
//           onClick={() => this.handleClick()}
//         >
//           Add Product
//         </button>
//         <div className="container row" style={{ marginTop: "30px" }}>
//           <div className="col-md-6">
//             <table className="table">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {this.state.content.map((product) => (
//                   <tr key={product.id}>
//                     {<td>{product.id}</td>}
//                     {<td>{product.name}</td>}
//                     <td>
//                       <button
//                         onClick={() => this.editProduct(product.id)}
//                         className="btn btn-info"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         style={{ marginLeft: "10px" }}
//                         onClick={() => this.deleteProduct(product.id)}
//                         className="btn btn-danger"
//                       >
//                         Delete
//                       </button>
//                       <button
//                         style={{ marginLeft: "10px" }}
//                         onClick={() => this.viewProduct(product.id)}
//                         className="btn btn-info"
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="col-md-6">
//             {this.state.toggle ? <CreateProduct /> : null}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default Product;
