import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from "react";
import axios from 'axios';
import { UserInterface } from "@znode/common/interfaces";

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const [test, setTest] = useState();

  const send = () => {
    axios
      .post<{ token: string, user: UserInterface }>('/api/auth/sign-in', { email, password })
      .then(res => {
        setResult(res.data.user.email);
      })
      .catch(err => {
        setResult(err.response.data.message);
        console.log(err.response.data.message);
      });
  };


  const testConnect = () => {
    axios.get<UserInterface>(
      '/api/auth/current-user', {
        headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiemFraGFyb2ZmLmFtQHlhLnJ1IiwibmFtZSI6Inpha2hhcm9mZmFtIiwiaXNBY3RpdmUiOnRydWUsImNyZWF0ZVRpbWVzdGFtcCI6IjIwMjItMDMtMDdUMjA6MDc6MzUuMDAwWiIsInVwZGF0ZVRpbWVzdGFtcCI6IjIwMjItMDMtMDdUMjA6MDc6MzUuMDAwWiJ9LCJpYXQiOjE2NDY3NjYyNzUsImV4cCI6MTY0Njc2NjQ1NX0.03o2oBugyZ7cWZQ-foPYjcD8csRcRr3loiQZvpbA3Vo'}
      })
      .then(res => {
        console.log(res.data);
        //setTest(res.data.email);
      })
      .catch(err => {
        setTest(err.response.data.message);
        console.log(err.response.data.message);
      });
  }


  return (
    <Box>
      <Typography variant="h6">Авторизация</Typography>
      <Typography variant="h5">{result}</Typography>
      <TextField
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        name="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button
        onClick={() => send()}
      >
        Войти
      </Button>
      <Button
        onClick={() => testConnect()}
      >
        Test
      </Button>
      <Typography variant="h5">{test}</Typography>
    </Box>
  );
}
