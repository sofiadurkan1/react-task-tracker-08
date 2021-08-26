import React from 'react';
import Button from './Button';
//import PropTypes from 'prop-types';

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="purple" text="Show Add Task Bar" />
    </header>
  );
};

export default Header;

// Header.defaultProps = {
//   title: 'Task Tracker',
// };

// Header.propTypes = {
//   title: PropTypes.string.isRequired,
// };
