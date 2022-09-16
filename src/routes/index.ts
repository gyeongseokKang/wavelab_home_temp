import GitHubIcon from '@mui/icons-material/GitHub';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Intro]: {
    component: asyncComponentLoader(() => import('@/pages/Intro')),
    path: '/',
    title: 'Intro',
    icon: GitHubIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
