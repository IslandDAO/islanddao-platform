import { ProjectMember, User } from '@islanddao-platform/sdk'
import { CoreUiButton, CoreUiDivider } from '@islanddao-platform/web-core-ui'
import { UserUiItem, UserUiSearch } from '@islanddao-platform/web-user-ui'
import { UiGroup, UiStack } from '@pubkey-ui/core'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { ProjectUiMemberTable } from './project-ui-member-table'

export function ProjectUiMemberManager({
  members,
  addUser,
  removeUser,
  max,
  placeholder,
}: {
  max?: number
  placeholder?: string
  members: ProjectMember[]
  addUser: (managerUserId: string) => Promise<boolean | null | undefined>
  removeUser: (managerUserId: string) => Promise<boolean | null | undefined>
}) {
  const addMore = max ? members.length < max : true
  const [user, setUser] = useState<User | undefined>(undefined)
  const users = (members.map((m) => m.user) ?? []).filter(Boolean) as User[]

  return (
    <UiStack>
      {addMore ? (
        <UiStack>
          <UserUiSearch users={users} label={null} select={setUser} placeholder={placeholder} />
        </UiStack>
      ) : null}
      {user ? (
        <UiStack key={user.id}>
          <UiGroup px="xs">
            <UserUiItem user={user} />
            <CoreUiButton size="xs" outline iconLeft={IconPlus} onClick={() => addUser(user.id)}>
              Select user
            </CoreUiButton>
          </UiGroup>
          <CoreUiDivider />
        </UiStack>
      ) : null}
      <ProjectUiMemberTable users={users} delete={removeUser} />
    </UiStack>
  )
}
