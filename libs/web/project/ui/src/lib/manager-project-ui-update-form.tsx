import { ManagerUpdateProjectInput, Project, ProjectStatus } from '@islanddao-platform/sdk'
import {
  CoreUiButton,
  CoreUiCurrencyInput,
  CoreUiDateInput,
  CoreUiDivider,
  CoreUiInput,
} from '@islanddao-platform/web-core-ui'
import { Group, SimpleGrid, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { UiStack } from '@pubkey-ui/core'
import { ReactNode } from 'react'

export function ManagerProjectUiUpdateForm({
  submit,
  project,
}: {
  submit: (res: ManagerUpdateProjectInput) => Promise<Project | null>
  project: Project
}) {
  const isDraft = project.status === ProjectStatus.Draft
  const form = useForm<ManagerUpdateProjectInput>({
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
        if (isDraft && value && new Date(value ?? new Date()).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)) {
          return 'Start date must be in the future.'
        }
      },
      linkDiscord: (value) => {
        if (value && !value.startsWith('https://discord.com/invite/') && !value.startsWith('https://discord.gg/')) {
          return 'Must be a valid Discord invite.'
        }
      },
      linkGithub: (value) => {
        if (value && !value.startsWith('https://github.com/')) {
          return 'Must be a valid Github repository, user or org.'
        }
      },
      linkTelegram: (value) => {
        if (value && !value.startsWith('https://t.me/')) {
          return 'Must be a valid Telegram link.'
        }
      },
      linkTwitter: (value) => {
        if (value && !value.startsWith('https://twitter.com/') && !value.startsWith('https://x.com/')) {
          return 'Must be a valid X page.'
        }
      },
      linkWebsite: (value) => {
        if (value && !value.startsWith('https://')) {
          return 'Must be a valid website.'
        }
      },
    },
  })

  return (
    <UiStack>
      <form
        onSubmit={form.onSubmit((values) =>
          submit({
            ...values,
            durationDays: parseInt(values.durationDays?.toString() ?? '2'),
          }),
        )}
      >
        <UiStack>
          <UiStack>
            <FormGrid>
              <CoreUiInput
                withAsterisk
                label="Name"
                placeholder="Name"
                description="The name of the project must be unique within the community."
                {...form.getInputProps('name')}
              />
            </FormGrid>
            <Textarea
              styles={{ input: { border: 'none' } }}
              withAsterisk
              minRows={10}
              autosize
              label="Instructions"
              description="Write instructions for the project. You can use markdown syntax for formatting."
              {...form.getInputProps('instructions')}
            />
          </UiStack>
          <CoreUiDivider />
          <FormGrid>
            <CoreUiDateInput
              disabled={!isDraft}
              label="Start Date"
              placeholder="The start date of the project."
              minDate={new Date()}
              {...form.getInputProps('startDate')}
            />
            <CoreUiInput
              disabled={!isDraft}
              label="Duration (days)"
              type="number"
              placeholder="The duration of the project in days."
              {...form.getInputProps('durationDays')}
            />
          </FormGrid>
          <CoreUiDivider />
          <FormGrid>
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
          </FormGrid>
          <CoreUiDivider />
          <FormGrid>
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
          </FormGrid>
          <Group justify="flex-end" mt="md">
            <CoreUiButton type="submit">Save changes</CoreUiButton>
          </Group>
        </UiStack>
      </form>
    </UiStack>
  )
}

function FormGrid({ children }: { children: ReactNode }) {
  return <SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>{children}</SimpleGrid>
}
