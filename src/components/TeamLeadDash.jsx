import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/EmployeeDash.css';


class TeamLeadDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevScrollPos: window.pageYOffset,
      visible: true
    };
  };

  // Adds an event listener when the component is mount.
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };

  // Remove the event listener when the component is unmount.
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  // Hide or show the menu.
  handleScroll = () => {
    const { prevScrollPos } = this.state;
    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollPos > currentScrollPos;

    this.setState({
      prevScrollPos: currentScrollPos,
      visible
    });
  };

  render() {
    const { visible } = this.state;
    return (
  <nav className={`navbar navbar-expand-lg navbar-dark ${visible ? 'navbar--visible' : 'navbar--hidden'}`}>
        <div className="container">
          <a className="navbar-brand text-black" href="/">
            <b>TeamLead Dashboard</b>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-black"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="mx-auto"></div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link text-black" href="/emplist">
                <b> Employee List</b>
                </a>
              </li>
              &nbsp; &nbsp;
              <li className="nav-item">
                <a className="nav-link text-black" href="/tasklist">
                <b>Task List</b>
                </a>
              </li>
              &nbsp; &nbsp;
              <li className="nav-item">
                <a className="nav-link text-black" href="/eprojectlist">
                <b>Project List</b>
                </a>
              </li>
              &nbsp; &nbsp;
              <li className="nav-item">
                <a className="nav-link text-black" href="/eteamlist">
                <b>Team List</b>
                </a>
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    );
  }
};

export default TeamLeadDash;
