import React from "react";
import "./App.css";
import { getRestaurant, addReview, getRatings } from "./RestaurantAPI";
import { NavLink } from "react-router-dom";

export default class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      loading: true,
      rating: 0,
      newreview: {
        restaurant: 0,
        rating: 5,
        review: "",
        publication: 0,
        url: ""
      },
      reviewexists: false,
      ratings: [],
      eater: "opacity",
      infatuation: "",
      latimes: "opacity",
      submitexists: false
    };
  }

  componentDidMount = async () => {
    document.title = "Add a review";
    this.props.clickFunction();
    console.log("mounted");
    const { id } = this.props.match.params;
    const details = await getRestaurant(id);
    console.log("details", details);
    let ratings = await getRatings(id);
    this.setState({ ratings });
    this.setState({ details, loading: false, id });
    this.setState(prevState => ({
      newreview: {
        // object that we want to update
        ...prevState.newreview, // keep all other key-value pairs
        restaurant: parseInt(id, 10)
      }
    }));
    for (var i = 0; i < this.state.ratings.length; i++) {
      console.log(this.state.newreview.publication);
      console.log(this.state.ratings[i].publication);
      if (
        this.state.ratings[i].publication === this.state.newreview.publication
      ) {
        this.setState({ reviewexists: true });
        console.log("exists");
      }
    }
  };
  handleRatingChange = event => {
    var newdata = { ...this.state.newreview };
    newdata.rating = parseInt(event.target.value, 10);
    this.setState({ newreview: newdata }, () => {
      console.log(this.state.newreview.rating);
    });
  };
  handleReviewChange = event => {
    var newdata = { ...this.state.newreview };
    newdata.review = event.target.value;
    this.setState({ newreview: newdata }, () => {
      console.log(this.state.newreview.rating);
    });
  };

  handleUrlChange = event => {
    var newdata = { ...this.state.newreview };
    newdata.url = event.target.value;
    this.setState({ newreview: newdata }, () => {
      console.log(this.state.newreview.rating);
    });
  };

  infatuation = () => {
    var newdata = { ...this.state.newreview };
    newdata.publication = 0;
    this.setState(
      {
        newreview: newdata,
        infatuation: "",
        eater: "opacity",
        latimes: "opacity",
        reviewexists: false
      },
      () => {
        console.log(this.state.newreview.rating);
        for (var i = 0; i < this.state.ratings.length; i++) {
          console.log(this.state.newreview.publication);
          console.log(this.state.ratings[i].publication);
          if (
            this.state.ratings[i].publication ===
            this.state.newreview.publication
          ) {
            this.setState({ reviewexists: true });
            console.log("exists");
          }
        }
      }
    );
  };
  eater = () => {
    var newdata = { ...this.state.newreview };
    newdata.publication = 1;
    this.setState(
      {
        newreview: newdata,
        infatuation: "opacity",
        eater: "",
        latimes: "opacity",
        reviewexists: false
      },
      () => {
        console.log(this.state.newreview.rating);
        for (var i = 0; i < this.state.ratings.length; i++) {
          console.log(this.state.newreview.publication);
          console.log(this.state.ratings[i].publication);
          if (
            this.state.ratings[i].publication ===
            this.state.newreview.publication
          ) {
            this.setState({ reviewexists: true });
            console.log("exists");
          }
        }
      }
    );
  };
  latimes = () => {
    var newdata = { ...this.state.newreview };
    newdata.publication = 2;
    this.setState(
      {
        newreview: newdata,
        infatuation: "opacity",
        eater: "opacity",
        latimes: "",
        reviewexists: false
      },
      () => {
        console.log(this.state.newreview.rating);
        for (var i = 0; i < this.state.ratings.length; i++) {
          console.log(this.state.newreview.publication);
          console.log(this.state.ratings[i].publication);
          if (
            this.state.ratings[i].publication ===
            this.state.newreview.publication
          ) {
            this.setState({ reviewexists: true });
            console.log("exists");
          }
        }
      }
    );
  };
  addReview = event => {
    if (this.state.reviewexists) {
      this.setState({ submitexists: true });
      console.log("exist");
      event.preventDefault();
    } else {
      event.preventDefault();
      addReview(this.state.newreview);
      window.location = "/restaurants/" + this.state.details.id + "/success";
    }
  };

  render() {
    return (
      <div className="addRestaurant">
        <NavLink to={`/restaurants/${this.state.id}`}>
          <div className="homeButton" onClick={this.props.showHeader}>
            Cancel
          </div>
        </NavLink>
        {this.state.submitexists ? (
          <div className="message error">
            A review for this publication already exists
          </div>
        ) : (
          ""
        )}
        <h1>Add a review for {this.state.details.name}</h1>
        <form onSubmit={this.addReview}>
          <label>Review Source</label>
          <div class="publications">
            <div
              class={`publication ${this.state.infatuation}`}
              onClick={this.infatuation}
            >
              <div class="publicationInner">
                <div class="publicationCenter">
                  <img src="https://d37219swed47g7.cloudfront.net/static/sg/2017/img/ny/logo_infat.2f0a5cc76458.png" />
                </div>
              </div>
            </div>
            <div class={`publication ${this.state.eater}`} onClick={this.eater}>
              <div class="publicationInner">
                <div class="publicationCenter">
                  <img src="https://www.southbaybyjackie.com/wp-content/uploads/2016/12/Eater-logo-2.png" />
                </div>
              </div>
            </div>
            <div
              class={`publication ${this.state.latimes}`}
              onClick={this.latimes}
            >
              <div class="publicationInner">
                <div class="publicationCenter">
                  <img src="https://caravanoutpostojai.com/wp-content/uploads/2017/05/latimes-logo.png" />
                </div>
              </div>
            </div>
          </div>
          <label>Rating</label>
          <input
            type="range"
            value={this.state.newreview.rating}
            onChange={this.handleRatingChange}
            placeholder="Restaurant name..."
            min="0"
            max="10"
          />
          <div className="ratingRange">
            <div class="left">0</div>
            <div class="center">{this.state.newreview.rating}</div>
            <div class="right">10</div>
          </div>
          <label>Review Link</label>
          <input
            type="url"
            onChange={this.handleUrlChange}
            placeholder="Link to the article..."
            required
          />
          <label>Review Text</label>
          <textarea
            class="textarea"
            onChange={this.handleReviewChange}
            placeholder={`What did the publication say about ${this.state.details.name}?`}
            required
          />

          <input type="submit" />
        </form>
      </div>
    );
  }
}
