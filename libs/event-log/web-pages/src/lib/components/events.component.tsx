import { useDispatch, useSelector } from "react-redux";
import { selectEvents, selectRequestMessage, setRequestMessage } from "../event-log.slice";
import { Box, Button, Typography } from "@mui/material";

export function EventsComponent() {
  const dispatch = useDispatch();
  const message = useSelector(selectRequestMessage);
  const events = useSelector(selectEvents);

  return (
    <Box>
      <Button
        onClick={() => {
          dispatch(setRequestMessage('Ура, Товарищи!!!'));
        }}
      >
        Сообщение
      </Button>
      {events.length === 0
        ? <Typography>Журнал пуст</Typography>
        : (
          <Box>
            {events.map(event => <Typography>{event.toString()}</Typography>)}
          </Box>
        )
      }
      {message && <Typography>{message}</Typography>}
    </Box>
  );
}
