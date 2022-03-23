import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from "react";
import axios from 'axios';
import { UserInterface } from "@znode/common/interfaces";

export function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

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
    </Box>
  );
}
