import { Box, Typography } from "@mui/material";


interface ErrorAppProps {
  appName: string;
}


export function ErrorAppPage(props: ErrorAppProps) {
  return (
    <Box>
      <Typography variant="h6">
        В приложении {props.appName} возникла ошибка!
      </Typography>
    </Box>
  )
}
