import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <Box>
      <Typography>Домашняя страница</Typography>
      <Link to="/">Домой</Link>
      <br/>
      <Link to="/404">Страница ошибки 404</Link>
      <br/>
      <Link to="/common-error">Страница общей ошибки приложения</Link>
    </Box>
  )
}
