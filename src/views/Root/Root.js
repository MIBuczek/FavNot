import React from 'react';
import Button from 'components/Buttons/Button';
import GlobalStyle from 'theme/GlobalStyle';

const Root = () => (
  <div>
    <GlobalStyle />
    <h1>Hello World</h1>
    <Button>Close / Save</Button>
    <Button secondary>Remove</Button>
  </div>
);

export default Root;
