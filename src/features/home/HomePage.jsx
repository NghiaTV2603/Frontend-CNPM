import React from 'react';
import { Helmet } from 'react-helmet';

import { APP_NAME } from 'src/app/constants';
import { Box, colors, Stack } from '@mui/material';
import Sidebar from 'src/features/home/components/Sidebar';
import Contents from 'src/features/home/components/Contents';

const HomePage = () => {
  const [index, setIndex] = React.useState(0);
  const handleIndexTab = (index) => {
    setIndex(index);
  };
  return (
    <React.Fragment>
      <Helmet>
        <title>{`Home | ${APP_NAME}`}</title>
      </Helmet>
      <Stack minWidth={1200}>
        <Stack height="100vh" direction="row">
          <Box bgcolor={colors.grey[900]} height="100vh" width={320}>
            <Sidebar handleIndexTab={handleIndexTab} />
          </Box>
          <Box width="100%">
            <Contents index={index} />
          </Box>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
