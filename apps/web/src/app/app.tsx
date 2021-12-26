import { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from './app.module.css';

const HomeWeb = lazy(() => import('@uparm-automation/home/home-web'));

export function App() {
  return (
    <div className={styles['app']}>
      <Link to="/">Home</Link>
      <Link to="test">Test</Link>
      <Link to="/notFound">Not found</Link>
      <Suspense fallback={<h4>Загрузка...</h4>}>
      <Routes>
          <Route path="/" element={<HomeWeb />} />
          <Route path="test" element={<h1>Test</h1>} />
          <Route path="*" element={(
            <div>
              <h1>Страница не найдена</h1>
            </div>
          )} />
      </Routes>
      </Suspense>
    </div>
  );
}

export default App;
