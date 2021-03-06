import React from 'react';
import './Emoji.css';

const emojis = {
  'br-flag': '0 0',
  'uk-flag': '0 30px',
  'person-macbook': '0 50px',
  heart: '0 15px',
};

const Emoji = ({ name, ...restProps }) => {
  const backgroundPosition = emojis[name];

  return (
    <div
      role="img"
      {...restProps}
      className="emoji"
      style={{ backgroundPosition }}
    ></div>
  );
};

Emoji.defaultProps = {};

export default Emoji;
