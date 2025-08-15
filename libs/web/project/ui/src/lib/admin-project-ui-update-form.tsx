import { AdminUpdateProjectInput, getEnumOptions, Project, ProjectStatus } from '@islanddao-platform/sdk'
import { CoreUiCurrencyInput, CoreUiInput } from '@islanddao-platform/web-core-ui'
import { Button, Fieldset, Group, Select, Textarea, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'

export function AdminProjectUiUpdateForm({
  submit,
  project,
}: {
  submit: (res: AdminUpdateProjectInput) => Promise<boolean>
  project: Project
}) {
  const form = useForm<AdminUpdateProjectInput>({
    initialValues: {
      amountManagerUsd: project.amountManagerUsd ?? 0,
      amountReferralUsd: project.amountReferralUsd ?? 0,
      amountTotalUsd: project.amountTotalUsd ?? 0,
      avatarUrl: project.avatarUrl ?? '',
      durationDays: project.durationDays ?? 7,
      instructions: project.instructions ?? '',
      linkDiscord: project.linkDiscord ?? '',
      linkGithub: project.linkGithub ?? '',
      linkTelegram: project.linkTelegram ?? '',
      linkTwitter: project.linkTwitter ?? '',
      linkWebsite: project.linkWebsite ?? '',
      name: project.name ?? '',
      startDate: new Date(project.startDate ?? new Date()),
      status: project.status ?? ProjectStatus.Draft,
    },

    validate: {
      name: (value) => {
        if (!value) {
          return 'Name is required.'
        }
        if (value.length < 3) {
          return 'Name must be at least 3 characters.'
        }
        if (value.length > 100) {
          return 'Name must be less than 100 characters.'
        }
      },
      avatarUrl: (value) => {
        if (value && !value.startsWith('http')) {
          return 'Avatar URL must be a valid URL.'
        }
      },
      durationDays: (value) => {
        if (value && value < 1) {
          return 'Duration must be at least 1 day.'
        }
        if (value && value > 365) {
          return 'Duration must be less than 1 year.'
        }
      },
      startDate: (value) => {
        if (value && new Date(value ?? new Date()).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
          return 'Start date must be in the future.'
        }
      },
    },
  })

  return (
    <UiStack>
      <form
        onSubmit={form.onSubmit((values) =>
          submit({ ...values, durationDays: parseInt(values.durationDays?.toString() ?? '2') }),
        )}
      >
        <UiStack>
          <Fieldset legend="General information">
            <UiStack>
              <TextInput
                withAsterisk
                label="Slug"
                description="The slug is a unique identifier for the project and cannot be changed."
                disabled
                defaultValue={project.slug}
              />
              <TextInput
                withAsterisk
                label="Name"
                placeholder="Name"
                description="The name of the project must be unique within the community."
                {...form.getInputProps('name')}
              />
              <TextInput
                label="Avatar URL"
                placeholder="Avatar URL"
                description="The URL of the project's avatar image. Leave blank to use the default avatar."
                {...form.getInputProps('avatarUrl')}
              />
              <Select
                label="Status"
                placeholder="Status"
                data={[...getEnumOptions(ProjectStatus)]}
                {...form.getInputProps('status')}
              />
              <Textarea
                withAsterisk
                rows={5}
                autosize
                label="Instructions"
                placeholder="Write instructions for the project. You can use markdown."
                description="The instructions for the project."
                {...form.getInputProps('instructions')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Timeline">
            <UiStack>
              <TextInput
                label="Duration"
                type="number"
                placeholder="Duration"
                description="The duration of the project in days."
                {...form.getInputProps('durationDays')}
              />
              <DateInput
                label="Start Date"
                placeholder="Start Date"
                description="The start date of the project."
                {...form.getInputProps('startDate')}
              />
            </UiStack>
          </Fieldset>

          <Fieldset legend="Amounts">
            <UiStack>
              <CoreUiCurrencyInput
                label="Total Amount"
                description="Total amount of USDC to be rewarded"
                {...form.getInputProps('amountTotalUsd')}
              />
              <CoreUiCurrencyInput
                label="Manager Amount"
                description="Amount of USDC managers get"
                {...form.getInputProps('amountManagerUsd')}
              />
              <CoreUiCurrencyInput
                label="Referral Amount"
                description="Amount of USDC the referral gets"
                {...form.getInputProps('amountReferralUsd')}
              />
            </UiStack>
          </Fieldset>
          <Fieldset legend="Socials">
            <CoreUiInput
              label="Avatar URL"
              placeholder="The URL of the project's avatar image."
              {...form.getInputProps('avatarUrl')}
            />
            <CoreUiInput
              label="Discord"
              placeholder="Link to an invite to the Discord server."
              {...form.getInputProps('linkDiscord')}
            />
            <CoreUiInput
              label="Github"
              placeholder="Link to the Github repository, user or org."
              {...form.getInputProps('linkGithub')}
            />
            <CoreUiInput
              label="Telegram"
              placeholder="Link to the project's Telegram channel."
              {...form.getInputProps('linkTelegram')}
            />
            <CoreUiInput
              label="X (formerly Twitter)"
              placeholder="Link to the project's X page."
              {...form.getInputProps('linkTwitter')}
            />
            <CoreUiInput
              label="Website"
              placeholder="Link to the project's website."
              {...form.getInputProps('linkWebsite')}
            />
          </Fieldset>
          <Group justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}
