import React from "react";
import "./App.css";
import Loading from "./LoadingComponent";
import { addRestaurant } from "./RestaurantAPI";
import { NavLink } from "react-router-dom";

export default class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      loading: true,
      rating: 0,
      newdetails: {
        name: "",
        description: "",
        image: "",
        cuisine: ""
      },
      isimage: true
    };
  }
  handleTitleChange = event => {
    var newdata = { ...this.state.newdetails };
    newdata.name = event.target.value;
    this.setState({ newdetails: newdata }, () => {
      console.log(this.state.newdetails.name);
    });
  };
  handleDescChange = event => {
    var newdata = { ...this.state.newdetails };
    newdata.description = event.target.value;
    this.setState({ newdetails: newdata }, () => {
      console.log(this.state.newdetails.name);
    });
  };
  handleImageChange = event => {
    var newdata = { ...this.state.newdetails };

    if (event.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null) {
      this.setState({ isimage: true });
    } else {
      this.setState({ isimage: false });
    }
    newdata.image = event.target.value;
    this.setState({ newdetails: newdata }, () => {});
  };
  handleCuisineChange = event => {
    var newdata = { ...this.state.newdetails };
    newdata.cuisine = event.target.value;
    this.setState({ newdetails: newdata }, () => {
      console.log(this.state.newdetails.name);
    });
  };
  addRestaurant = event => {
    event.preventDefault();
    this.props.success();
    addRestaurant(this.state.newdetails);
    window.location = "/addsuccess";
  };

  componentDidMount = () => {
    document.title = "Add a restaurant";
    this.props.clickFunction();
  };

  render() {
    return (
      <div className="addRestaurant">
        <NavLink to="/">
          <div className="homeButton" onClick={this.props.showHeader}>
            Cancel
          </div>
        </NavLink>
        <h1>Add a new restaurant</h1>
        <form onSubmit={this.addRestaurant}>
          <label>Restaurant Name</label>
          <input
            type="text"
            onChange={this.handleTitleChange}
            placeholder="Restaurant name..."
          />
          <label>Restaurant Description</label>
          <input
            type="text"
            onChange={this.handleDescChange}
            placeholder="Restaurant description..."
          />
          <label>Image of restaurant</label>
          <input
            type="text"
            onChange={this.handleImageChange}
            placeholder="Restaurant image link..."
          />
          {!this.state.isimage ? (
            <div className="message error">
              The URL provided is not an image
            </div>
          ) : (
            ""
          )}
          <label>Type of cuisine</label>
          <input
            type="text"
            onChange={this.handleCuisineChange}
            placeholder="Restaurant cuise type..."
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}
