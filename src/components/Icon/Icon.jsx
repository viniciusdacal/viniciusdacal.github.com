import React from 'react';

import instagram from './instagram';
import linkedin from './linkedin';
import twitter from './twitter';
import youtube from './youtube';

const icons = {
  instagram,
  linkedin,
  twitter,
  youtube,
};

const Icon = ({ name, size, ...restProps }) => {
  const Component = icons[name];

  return <Component width={size} height={size} {...restProps} />
};

Icon.defaultProps = {
  size: '24',
};

export default Icon;
