import React from "react";
import "./App.css";
import Loading from "./LoadingComponent";
import {
  getRestaurant,
  getRatings,
  updateRestaurant,
  deleteRestaurant
} from "./RestaurantAPI";
import { NavLink } from "react-router-dom";

export default class RestaurantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      details: [],
      loading: true,
      rating: 0,
      newdetails: {
        name: "",
        description: ""
      }
    };
  }
  componentDidMount = async () => {
    document.title = "Edit restaurant";
    this.props.clickFunction();
    const { id } = this.props.match.params;
    const details = await getRestaurant(id);
    this.setState({ details, loading: false, id });
    this.setState(prevState => ({
      newdetails: {
        // object that we want to update
        ...prevState.newdetails, // keep all other key-value pairs
        name: this.state.details.name, // update the value of specific key
        description: this.state.details.description
      }
    }));
    let ratings = await getRatings(id);
    var total = 0;
    for (var i = 0; i < ratings.length; i++) {
      total += ratings[i].rating;
    }
    var avg = total / ratings.length;
    if (isNaN(avg)) {
      this.setState({ rating: "No ratings yet" });
    } else {
      var round = avg.toFixed(1);
      this.setState({ rating: round });
    }
  };
  handleTitleChange = event => {
    var newdata = { ...this.state.newdetails };
    newdata.name = event.target.value;
    this.setState({ newdetails: newdata }, () => {
      console.log(this.state.newdetails);
    });
  };
  handleDescChange = event => {
    var newdata = { ...this.state.newdetails };
    newdata.description = event.target.value;
    this.setState({ newdetails: newdata });
    console.log(this.state.newdetails);
  };
  editRestaurant = event => {
    event.preventDefault();
    updateRestaurant(this.state.details.id, this.state.newdetails);
    window.location = "/restaurants/" + this.state.details.id + "/success";
  };
  deleteRestaurant = event => {
    event.preventDefault();
    deleteRestaurant(this.state.details.id);
    window.location = "/delete";
  };

  render() {
    return (
      <div className="editRestaurant">
        <NavLink to={`/restaurants/${this.state.id}`}>
          <div className="homeButton" onClick={this.props.showHeader}>
            Back to reviews
          </div>
        </NavLink>
        <div>
          <h1>Edit {this.state.details.name}</h1>
          <form onSubmit={this.editRestaurant}>
            <label>Restaurant Name</label>
            <input
              type="text"
              value={this.state.newdetails.name}
              onChange={this.handleTitleChange}
            />
            <label>Restaurant Description</label>
            <input
              type="text"
              value={this.state.newdetails.description}
              onChange={this.handleDescChange}
            />
            <input type="submit" />
          </form>
          <form onSubmit={this.deleteRestaurant}>
            <input type="submit" value="Delete" className="delete" />
          </form>
        </div>
      </div>
    );
  }
}
