import React from "react";
import SearchHeader from "./SearchHeader";
// import { getPlaylists } from './MusicAPI.js';
// import Loading from './Loading';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
// import Tracks from './Tracks'
// import Library from './Library'
// import PageNotFound from './PageNotFound'
import "./App.css";
import Loading from "./LoadingComponent";
import RestaurantCard from "./RestaurantCard";
import RestaurantDetails from "./RestaurantDetails";
import EditRestaurant from "./EditRestaurant";
import AddRestaurant from "./AddRestaurant";
import AddReview from "./AddReview";
import NotFound from "./NotFound";
import { getRestaurants } from "./RestaurantAPI";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      loading: true,
      searchedRestaurants: [],
      firstLoad: true,
      headerColor: "#6665d2",
      headerClass: "searchHeader",
      addId: 0,
      addSuccess: false
    };
  }
  async componentDidMount() {
    document.title = "Home";
    let restaurants = await getRestaurants();
    this.setState({ restaurants: restaurants, loading: false });
  }

  searchRestaurants = searchTerm => {
    this.setState({ loading: true });
    if (searchTerm === "") {
      this.setState({ firstLoad: true, loading: false });
    } else {
      this.setState({ searchedRestaurants: [] });
      let restaurants = this.state.restaurants;
      let searched = this.state.searchedRestaurants;
      searched = restaurants.filter(function(user) {
        return user.name.toLowerCase().indexOf(searchTerm) !== -1; // returns true or false
      });
      this.setState({
        searchedRestaurants: searched,
        firstLoad: false,
        loading: false
      });
    }
  };

  transition = () => {
    this.setState({ headerClass: "moveUp" });
  };

  showHeader = () => {
    this.setState({ headerClass: "searchHeader" });
  };

  updateAddId = id => {
    this.setState({ addId: id });
    console.log("newidddd", this.state.addId);
  };

  success = () => {
    this.setState({ addSuccess: true });
  };

  render() {
    return (
      <div className="App">
        <SearchHeader
          positionClass={this.state.headerClass}
          searchFunction={this.searchRestaurants}
          title="Less time reading, more time eating."
          description="No need to spend hours on other review platforms. We've curated reviews from expert food bloggers and synthesized them to make your dining decision simple."
        ></SearchHeader>
        <BrowserRouter>
          <NavLink to="/add">
            <div className="add">
              <span>+</span>Add a restaurant
            </div>
          </NavLink>
          <Switch>
            <Route path="/" exact={true}>
              {this.state.loading ? (
                <Loading />
              ) : this.state.firstLoad ? (
                <div className="restaurantList">
                  {this.state.addSuccess ? (
                    <div className="message success">Restaurant added!</div>
                  ) : (
                    ""
                  )}
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.restaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          clickFunction={this.transition}
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="restaurantList">
                  {this.state.addSuccess ? (
                    <div className="message success">Restaurant added!</div>
                  ) : (
                    ""
                  )}
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.searchedRestaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </Route>
            <Route path="/success" exact={true}>
              {this.state.loading ? (
                <Loading />
              ) : this.state.firstLoad ? (
                <div className="restaurantList">
                  <div className="message success">Restaurant added!</div>
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.restaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          clickFunction={this.transition}
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="restaurantList">
                  <div className="message success">Restaurant added!</div>
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.searchedRestaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </Route>
            <Route path="/delete" exact={true}>
              {this.state.loading ? (
                <Loading />
              ) : this.state.firstLoad ? (
                <div className="restaurantList">
                  <div className="message success">Restaurant deleted</div>
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.restaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          clickFunction={this.transition}
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="restaurantList">
                  <div className="message success">Restaurant deleted</div>
                  <h1>All restaurants</h1>
                  <div className="row">
                    {this.state.searchedRestaurants.map(restaurant => {
                      return (
                        <RestaurantCard
                          cuisine={restaurant.cuisine}
                          onClick={this.transition}
                          image={restaurant.image}
                          name={restaurant.name}
                          description={restaurant.description}
                          key={restaurant.id}
                          resid={restaurant.id}
                          ratings={restaurant.ratings}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </Route>
            <Route
              path="/restaurants/:id"
              render={routeProps => (
                <RestaurantDetails
                  {...routeProps}
                  updateAddId={this.updateAddId}
                  showHeader={this.showHeader}
                  clickFunction={this.transition}
                />
              )}
              exact
            />

            <Route
              path="/restaurants/:id/edit"
              render={routeProps => (
                <EditRestaurant
                  {...routeProps}
                  showHeader={this.showHeader}
                  clickFunction={this.transition}
                />
              )}
              exact
            />
            <Route
              path="/add"
              render={routeProps => (
                <AddRestaurant
                  {...routeProps}
                  success={this.success}
                  showHeader={this.showHeader}
                  clickFunction={this.transition}
                />
              )}
              exact
            />
            <Route
              path="/restaurants/:id/addreview"
              render={routeProps => (
                <AddReview {...routeProps} clickFunction={this.transition} />
              )}
              exact
            />
            <Route
              path="/restaurants/:id/success"
              render={routeProps => (
                <RestaurantDetails
                  {...routeProps}
                  updateAddId={this.updateAddId}
                  success="true"
                  showHeader={this.showHeader}
                  clickFunction={this.transition}
                />
              )}
              exact
            />
            <Route path="/" render={routeProps => <NotFound />} />
            <Route path="/notfound" render={routeProps => <NotFound />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
