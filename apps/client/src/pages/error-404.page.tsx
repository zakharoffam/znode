import { Box, Typography } from '@mui/material';


export function Error404Page() {
  document.title = 'ZNode - 404';

  return (
    <Box>
      <Typography variant="h6">404</Typography>
      <Typography variant="h6">Not Found</Typography>
    </Box>
  );
}
