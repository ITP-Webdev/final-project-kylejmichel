import React from "react";
import "./App.css";
import Loading from "./LoadingComponent";
import ReviewCard from "./ReviewCard";
import { getRestaurant, getRatings, getPublications } from "./RestaurantAPI";
import { NavLink } from "react-router-dom";

export default class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratings: []
    };
  }
  componentDidMount = async () => {
    console.log("ratings new", this.props.ratings);
    this.setState({ ratings: this.props.ratings });
    var total = 0;
    console.log("length", this.props.ratings.length);
    for (var i = 0; i < this.props.ratings.length; i++) {
      total += this.props.ratings[i].rating;
      console.log("iterated");
    }
    console.log("total", total);
    var avg = total / this.props.ratings.length;
    if (isNaN(avg)) {
      this.setState({ rating: "No ratings yet" });
    } else {
      var round = avg.toFixed(1);
      this.setState({ rating: round });
    }
  };
  render() {
    const style = {
      background: this.props.background,
      color: this.props.textColor
    };
    const badgestyle = {
      background: this.props.badgeColor
    };
    return (
      <div data-testid={`box`} className="ratingBox" style={style} id="box">
        <span className="testinghide" data-testid="background">
          {this.props.background}
        </span>
        <span className="testinghide" data-testid="badgecolor">
          {this.props.badgeColor}
        </span>
        <span className="testinghide" data-testid="textcolor">
          {this.props.textColor}
        </span>
        <div data-testid={`money`} className="money">
          {this.props.money}
        </div>
        <span data-testid={`value`}>{this.state.rating}</span>/
        <span data-testid={`outOf`} className="outOf">
          {this.props.outOf}
        </span>
        <div className="from" data-testid={`from`}>
          {this.state.ratings.length} publication
          {this.state.ratings.length > 1 ? "s" : ""}
        </div>
        <div
          className="from small"
          data-testid={`recommend`}
          style={badgestyle}
        >
          {this.state.rating > 5 ? "Recommended" : "Not recommended"}
        </div>
      </div>
    );
  }
}
