import React from "react";

import CheckSearch from "./CheckSearch";

export default class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      shouldHide: false,
      positionClass: ""
    };
  }

  handleCheck = event => {
    this.setState(
      {
        searchTerm: event.target.value
      },
      () => {
        this.props.searchFunction(this.state.searchTerm);
      }
    );

    if (event.target.value.length > 3) {
      this.setState({ shouldHide: true });
    } else {
      this.setState({ shouldHide: false });
    }
  };

  componentWillReceiveProps({ positionClass }) {
    console.log("update");
    this.setState({ ...this.state, positionClass });
  }

  render() {
    return (
      <div className={this.state.positionClass}>
        <div className="searchInner">
          <h1>{this.props.title}</h1>
          <p>{this.props.description}</p>
          <CheckSearch min={3} searchTerm={this.state.searchTerm}>
            {remaining => {
              return (
                <div>
                  <input
                    type="text"
                    placeholder="start typing to search for a restaurant..."
                    onChange={this.handleCheck}
                  />
                  <div className={this.state.shouldHide ? "hidden" : ""}></div>
                </div>
              );
            }}
          </CheckSearch>
        </div>
      </div>
    );
  }
}
