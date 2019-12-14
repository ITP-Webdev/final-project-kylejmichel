import React from 'react';
import SearchHeader from './SearchHeader';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';
import Loading from './LoadingComponent'
import RestaurantCard from './RestaurantCard'
import { getRestaurants }from './RestaurantAPI'

export default class App extends React.Component {
  constructor(props) {
     super(props);
     this.state = {
       restaurants: [],
       loading: true,
       searchedRestaurants: [],
       firstLoad: true
     };
   }
 async componentDidMount() {
     let restaurants = await getRestaurants();
     this.setState({ restaurants: restaurants, loading: false });
     console.log({this.props.image})
}
render() {
  return (
    <div className="App">
      <div className="add"><span>+</span>Add a restaurant</div>
      <SearchHeader searchFunction={this.searchRestaurants} title="Less time reading, more time eating." description="No need to spend hours on other review platforms. We've curated reviews from expert food bloggers and synthesized them to make your dining decision simple."></SearchHeader>
      <Switch>
        <Route path="/" exact={true}>
      {this.state.loading ? <Loading /> : this.state.firstLoad ?

        <div className="restaurantList">
        <h1>All restaurants</h1>
          <div className="row">

          {this.state.restaurants.map((restaurant) => {
              return <RestaurantCard image={require(restaurant.image)} name={restaurant.name} description={restaurant.description} key={restaurant.key} resid={restaurant.id} ratings={restaurant.ratings} />
            })}
          </div>
        </div>


        :

        <div className="restaurantList">
        <h1>All restaurants</h1>
          <div className="row">

          {this.state.searchedRestaurants.map((restaurant) => {
              return <RestaurantCard image={restaurant.image} name={restaurant.name} description={restaurant.description} key={restaurant.key} resid={restaurant.id} ratings={restaurant.ratings} />
            })}
          </div>
        </div>


        }
        </Route>
        <Route path="/hi" exact={true}>

        </Route>
      </Switch>
    </div>
  );
}
}
