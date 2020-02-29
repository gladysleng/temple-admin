import './application.scss';
import React from 'react';
import Profile from './profile.js';

export default class Application extends React.Component {
  render() {
    return (
      <div className="mobile-scale">
        <Profile/>
      </div>
    );
  }
}