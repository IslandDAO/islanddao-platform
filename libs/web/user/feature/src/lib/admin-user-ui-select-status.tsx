import { getEnumOptions, UserStatus } from '@islanddao-platform/sdk'
import { UiSelectEnum } from '@pubkey-ui/core'

export function AdminUserUiSelectStatus({
  value,
  setValue,
}: {
  value: UserStatus | undefined
  setValue: (value: UserStatus | undefined) => void
}) {
  return (
    <UiSelectEnum<UserStatus>
      value={value}
      setValue={setValue}
      options={[{ value: '', label: 'Filter by status' }, ...getEnumOptions(UserStatus)]}
    />
  )
}
