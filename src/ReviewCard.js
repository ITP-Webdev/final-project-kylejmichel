import React from "react";
import { NavLink } from "react-router-dom";
import "./App.css";
import { getRatings } from "./RestaurantAPI";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="reviewCard col-md-8" onClick={this.props.clickFunction}>
        <a href={this.props.url} target="_blank">
          <div className="innerCard">
            <img
              data-testid={`src`}
              src={this.props.image}
              className="publicationImage"
            />
            <div className="rating">
              <span data-testid={`ratingcard`}>{this.props.rating}</span>/10
            </div>
            <div className="innerPadding">
              <h2>{this.props.name}</h2>
              <p data-testid={`reviewbody`}>{this.props.review}</p>
              <a
                data-testid={`articlelink`}
                href={this.props.url}
                target="_blank"
              >
                <div className="homeButton">Read full review</div>
              </a>
            </div>
          </div>
        </a>
      </div>
    );
  }
}
