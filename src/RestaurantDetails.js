import React from "react";
import "./App.css";
import Loading from "./LoadingComponent";
import ReviewCard from "./ReviewCard";
import { getRestaurant, getRatings, getPublications } from "./RestaurantAPI";
import { NavLink } from "react-router-dom";
import Rating from "./Rating";

export default class RestaurantDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      details: [],
      loading: true,
      rating: 0,
      ratings: [],
      publications: [],
      success: false
    };
  }
  componentDidMount = async () => {
    const publications = await getPublications();
    this.setState({ publications });
    this.setState({ success: this.props.success });
    console.log("publications", this.state.publications);
    this.props.clickFunction();
    const { id } = this.props.match.params;
    const details = await getRestaurant(id);
    this.setState({ details, id });
    let ratings = await getRatings(id);
    this.setState({ ratings });
    this.setState({ loading: false });
    this.props.updateAddId(this.state.id);
    document.title = this.state.details.name;
  };

  render() {
    const style = {
      backgroundImage: "url('" + this.state.details.image + "')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    };
    return (
      <div className="restaurantDetails">
        <div className="restaurantHeader" style={style}>
          <div className="headerInner">
            {this.state.loading ? (
              <Loading />
            ) : (
              <div>
                <div className="summary">
                  <h1>{this.state.details.name}</h1>
                  <p className="cuisine">{this.state.details.cuisine}</p>
                </div>
                <p className="description">{this.state.details.description}</p>
                <Rating
                  background="#fff"
                  textColor="#6665d2"
                  outOf="10"
                  ratings={this.state.ratings}
                  money={this.state.details.cost}
                  badgeColor="#6665d2"
                />
              </div>
            )}
          </div>
          <div className="overlay"></div>
        </div>
        <div className="restaurantReviews">
          <NavLink to="/">
            <div className="homeButton" onClick={this.props.showHeader}>
              Home
            </div>
          </NavLink>
          <NavLink to={`/restaurants/${this.state.id}/edit`}>
            <div className="editButton">Edit Restaurant</div>
          </NavLink>
          <div className="centerReviews">
            <div className="messageCenter">
              {this.state.success ? (
                <div className="message success">Restaurant updated</div>
              ) : (
                ""
              )}
            </div>
            {this.state.ratings < 0 ? (
              <div>No reviews</div>
            ) : (
              <>
                {this.state.ratings.map(review => {
                  return (
                    <ReviewCard
                      publication={
                        this.state.publications[review.publication].name
                      }
                      rating={review.rating}
                      review={review.review}
                      url={review.url}
                      image={this.state.publications[review.publication].image}
                    />
                  );
                })}
              </>
            )}
          </div>
          <div className="addReviewButton">
            <NavLink to={`/restaurants/${this.state.id}/addreview`}>
              <div className="homeButton">Add Review</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
