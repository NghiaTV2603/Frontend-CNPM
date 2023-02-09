import React from 'react';
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
      <Stack minWidth={1200} minHeight={710} height='100vh'>
        <Stack height='100%'  direction="row">
          <Box height='100%' bgcolor={colors.grey[900]}  width={320}>
            <Sidebar handleIndexTab={handleIndexTab} />
          </Box>
          <Box height='100%' width="100%">
            <Contents index={index} />
          </Box>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default HomePage;
