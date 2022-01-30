import { Box, Typography } from '@mui/material';

interface ErrorPageProps {
  component: string;
}

export function ErrorPage(props: ErrorPageProps) {
  return (
    <Box>
      <Typography variant="h6">В компоненте {props.component} возникла ошибка!</Typography>
    </Box>
  );
}
