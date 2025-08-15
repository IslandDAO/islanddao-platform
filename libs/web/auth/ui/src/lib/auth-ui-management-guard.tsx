import { useAuth } from '@islanddao-platform/web-auth-data-access'
import { Navigate, Outlet } from 'react-router-dom'

export function AuthUiManagementGuard({ redirectTo }: { redirectTo: string }) {
  const { user } = useAuth()

  return user?.manager ? <Outlet /> : <Navigate replace to={redirectTo} />
}
