import { ErrorInterceptor } from "../error-interceptor";
import { Box, Button, ButtonProps, Grid, styled, Typography } from '@mui/material';
import { Header } from "@znode/client/header";
import { yellow } from "@mui/material/colors";


const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(yellow[500]),
  borderRadius: '24px',
  textTransform: 'none',
  backgroundColor: yellow[500],
  '&:hover': {
    backgroundColor: yellow[900],
  },
}));

export function HomePage() {
  document.title = 'ZNode - Домашняя страница';

  return (
    <ErrorInterceptor appName="Домашняя страница">
      <Box>
        <Header />
        <Grid
          container
          spacing={2}
          sx={{ padding: 2 }}
        >
          <Grid item xs={12} md={4}>
            <Typography
              variant="subtitle1"
              sx={{ paddingRight: 2 }}
            >
              ZNode — это что-то с чем-то. <br />
              Скоро будет добавлена более подробная информация о проекте и о том, для чего он был создан.
              Пока что предлагаем вам ничего здесь не делать, не нажимать никакие кнопки и если вам не дает покоя
              что же мы такое, предлагаем подписаться на новости.
            </Typography>
            <Box
              sx={{ marginTop: 2 }}
            >
              <ColorButton
                variant="contained"
                size="large"
                onClick={() => {
                  alert('Иго-го!!!');
                }}
              >
                <Typography>Хочу все знать</Typography>
              </ColorButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography
              variant="h2"
              sx={{ color: '#FFFFFF' }}
            >
              Сделаем мир лучше! <br />
              Пока что, мы не знаем как это сделать, но верим что все получится... ; )
            </Typography>
          </Grid>
        </Grid>

      </Box>
    </ErrorInterceptor>
  );
}
