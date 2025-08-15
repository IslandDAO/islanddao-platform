import { Project } from '@islanddao-platform/sdk'
import { CommunityUiItem } from '@islanddao-platform/web-community-ui'
import { ActionIcon, Group, ScrollArea } from '@mantine/core'
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable, DataTableProps } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { ProjectUiItem } from './project-ui-item'

export function AdminProjectUiTable({
  deleteProject,
  projects = [],
  onPageChange,
  page,
  recordsPerPage,
  totalRecords,
}: {
  deleteProject: (project: Project) => void
  projects: Project[]
  page: DataTableProps['page']
  totalRecords: DataTableProps['totalRecords']
  recordsPerPage: DataTableProps['recordsPerPage']
  onPageChange: (page: number) => void
}) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withTableBorder
        shadow="xs"
        onPageChange={onPageChange}
        page={page ?? 1}
        recordsPerPage={recordsPerPage ?? 10}
        totalRecords={totalRecords ?? 1}
        columns={[
          {
            accessor: 'name',
            render: (item) => <ProjectUiItem project={item} to={item.id} />,
          },
          {
            accessor: 'community',
            render: (item) => (item?.community ? <CommunityUiItem community={item.community} to={item.id} /> : null),
          },
          { accessor: 'status' },
          {
            accessor: 'actions',
            title: 'Actions',
            textAlign: 'right',
            render: (item) => (
              <Group gap="xs" justify="right">
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={item.viewUrl}>
                  <IconEye size={16} />
                </ActionIcon>
                <ActionIcon color="brand" variant="light" size="sm" component={Link} to={`./${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" variant="light" size="sm" onClick={() => deleteProject(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={projects}
      />
    </ScrollArea>
  )
}
