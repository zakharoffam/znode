import styles from './app.module.css';
import { useState } from "react";
import { AuthWeb } from "@uparm-automation/auth/auth-web";

export function App() {
  const [login, setLogin] = useState<string>('');

  return (
    <div className={styles['root']}>
      <div className={styles['auth']}>
        <input
          aria-label="login"
          type="text"
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <AuthWeb login={login}>
          <p className={styles['welcome']}>Welcome Web</p>
          <span>Test</span>
        </AuthWeb>
      </div>
    </div>
  );
}

export default App;
