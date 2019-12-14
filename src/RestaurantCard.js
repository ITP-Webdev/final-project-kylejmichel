import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { getRatings } from "./RestaurantAPI";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      ratings: [],
      id: 0
    };
  }
  async componentDidMount() {
    let ratings = await getRatings(this.props.resid);
    this.setState({ ratings: ratings, id: this.props.resid });
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
  }
  async componentDidUpdate() {
    if (this.props.resid !== this.state.id) {
      this.setState({ id: this.props.resid });
      let ratings = await getRatings(this.props.resid);
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
    }
  }
  render() {
    const style = {
      backgroundImage: "url('" + this.props.image + "')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    return (
      <div
        className="restaurantCard col-md-4"
        onClick={this.props.clickFunction}
      >
        <NavLink to={`/restaurants/${this.state.id}`}>
          <div className="innerCard">
            <div className="rating">
              {this.state.rating}
              {this.state.rating == "No ratings yet" ? "" : "/10"}
            </div>
            <div className="imageContainer" style={style}></div>
            <div className="innerPadding">
              <h2>{this.props.name}</h2>
              <p data-testid="cuisine" className="cuisine">
                {this.props.cuisine}
              </p>
              <p>{this.props.description}</p>
            </div>
          </div>
        </NavLink>
      </div>
    );
  }
}
