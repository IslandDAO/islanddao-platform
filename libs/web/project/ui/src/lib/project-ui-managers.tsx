import { Project, User } from '@islanddao-platform/sdk'
import { UserUiLink } from '@islanddao-platform/web-user-ui'
import { Group } from '@mantine/core'

export function ProjectUiManagers({ project }: { project: Project }) {
  const users = (project.managers ?? []).map((m) => m.user) as User[]

  return (
    <Group>
      {users.map((user) => {
        return <UserUiLink key={user.id} user={user} to={user?.profileUrl} />
      })}
    </Group>
  )
}
