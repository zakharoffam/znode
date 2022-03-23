import { Box, Typography } from "@mui/material";


interface ErrorAppProps {
  appName: string;
}


export function ErrorAppPage(props: ErrorAppProps) {
  document.title = 'ZNode - Ошибка приложения!';

  return (
    <Box>
      <Typography variant="h6">
        В приложении {props.appName} возникла ошибка!
      </Typography>
    </Box>
  )
}
