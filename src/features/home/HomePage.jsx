import { Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';


import { APP_NAME } from 'src/app/constants';

const HomePage = () => {
  

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>
    </React.Fragment>
  );
};

export default HomePage;
