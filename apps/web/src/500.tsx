import { Box } from "@mui/material";
import { Link } from "react-router-dom";


export function InternalServerErrorPage() {
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      height: '100vh',
    }}>
      <Box sx={{ margin: 'auto' }}>
        <Box sx={{ margin: 'auto', fontSize: '200px' }}>500</Box>
        <Box sx={{ margin: 'auto', fontSize: '34px' }}><Link to="/">На главную страницу</Link></Box>
      </Box>
    </Box>
  )
}
