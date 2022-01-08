import { Box, Typography } from "@mui/material";

export interface ErrorPageProps {
  status?: 401 | 403 | 404 | 500 ;
  message?: string;
}

export function ErrorPage(props: ErrorPageProps) {
  return (
    <Box>
      {props.status ? (
        <Box>
          <Typography variant="h3">Ошибка {props.status}</Typography>
          {props.message && (
            <Typography>{props.message}</Typography>
          )}
        </Box>
      ) : (
        <Box>
          <Typography>Что-то случилось! :(</Typography>
        </Box>
      )}
    </Box>
  );
}

export default ErrorPage;
