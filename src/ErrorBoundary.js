// mostly code from react.js.org/docs/error-boundaries.html

import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false, count: 5 };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
    let the_count = this.state.count;
    setInterval(() => {
      the_count--;
      this.setState({ count: the_count });
    }, 1000);
  }
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to go back to the home page or wait {this.state.count} second
          {this.state.count > 1 ? "s" : ""}.
        </h1>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
