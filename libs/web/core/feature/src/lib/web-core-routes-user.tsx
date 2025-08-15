import { UserCommunityFeature } from '@islanddao-platform/web-community-feature'
import { CoreUiNotFound } from '@islanddao-platform/web-core-ui'
import { UserFaqItemFeature } from '@islanddao-platform/web-faq-item-feature'
import { ReviewerProjectFeature } from '@islanddao-platform/web-project-feature'
import { ReviewerUsernameReviewFeature } from '@islanddao-platform/web-review-feature'
import { SettingsFeature } from '@islanddao-platform/web-settings-feature'
import { SolanaFeature } from '@islanddao-platform/web-solana-feature'
import { UserFeature } from '@islanddao-platform/web-user-feature'
import { lazy } from 'react'
import { Navigate, RouteObject, useRoutes } from 'react-router-dom'

export const ManagerRoutes = lazy(() => import('./web-core-routes-manager'))

const routes: RouteObject[] = [
  // User Dashboard Routes are added by the web-crud generator
  { path: '/dashboard', element: <Navigate to="/projects" replace /> },
  { path: '/faq/*', element: <UserFaqItemFeature /> },
  { path: '/manager/*', element: <ManagerRoutes /> },
  { path: '/projects/*', element: <ReviewerProjectFeature /> },
  { path: '/settings/*', element: <SettingsFeature /> },
  { path: '/reviews/*', element: <ReviewerUsernameReviewFeature /> },
  { path: '/solana/*', element: <SolanaFeature /> },
  { path: '/communities/*', element: <UserCommunityFeature /> },
  { path: '/u/*', element: <UserFeature /> },
  { path: '*', element: <CoreUiNotFound to="/dashboard" /> },
]

export default function WebCoreRoutesUser() {
  return useRoutes(routes)
}
