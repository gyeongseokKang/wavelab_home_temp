import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';

import './theme/global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
