import '../styles/main.less';

import React from 'react';
import ReactDOM from 'react-dom';
import { getContent } from './utils/getContent';
import { transformContent } from './utils/transformContent';

import { MainTable } from './components/MainTable';

getContent()
  .then(transformContent)
  .then(content => {
    const element = (
      <MainTable content={content} />
    );

    ReactDOM.render(element, document.getElementById('wrapper'));
  })
  // eslint-disable-next-line
  .catch(console.log);
