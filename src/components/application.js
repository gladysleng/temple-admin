import './application.scss';
import React from 'react';

export default class Application extends React.Component {
  render() {
    return (
      <div className="h-100 d-flex flex-column justify-content-center align-items-center mobile-scale">
        <div style={{display: "inline-block"}}>
          <h1> hello </h1>
        </div>
      </div>
    );
  }
}