import { Box, Typography } from "@mui/material";


export function ErrorAppPage() {
  document.title = 'ZNode - Ошибка приложения!';

  return (
    <Box>
      <Typography variant="h6">
        В приложении возникла ошибка!
      </Typography>
    </Box>
  )
}
