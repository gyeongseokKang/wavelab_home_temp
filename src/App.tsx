import { BrowserRouter } from 'react-router-dom';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Footer from '@/sections/Footer';
import Header from '@/sections/Header';

import './theme/global.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Pages />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
