import { useEffect, useState } from "react";
import axios from 'axios';
import { UserInterface } from "@uparm-automation/auth/common";

export interface AuthServiceProps {
  login: string;
  children: any;
}

export function AuthService(props: AuthServiceProps) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (props.login.length) {
      axios.get<UserInterface>(`/api/auth/${props.login}`)
        .then(res => {
          setError(null);
          setUser(res.data);
        })
        .catch(err => {
          setUser(null);
          if (err.response.status === 401) {
            setError(`Пользователь ${props.login} не существует`);
          } else {
            setError(err.message);
          }
        });
    }
  }, [props.login]);

  return (
    <div>
      {error && (
        <p>{error}</p>
      )}
      {user && (
        <div>
          <h3>Добро пожаловать, {user.fullName}!</h3>
          {props.children}
        </div>
      )}
    </div>
  );
}

export default AuthService;
