import { FaqItemAdminCreateInput, FaqItemAdminFindManyInput, sdk } from '@islanddao-platform/sdk'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminFindManyFaqItem(props: Partial<FaqItemAdminFindManyInput> = {}) {
  const [search, setSearch] = useState<string>(props?.search ?? '')

  const input: FaqItemAdminFindManyInput = { search }
  const query = useQuery({
    queryKey: ['admin', 'find-many-faq-item', input],
    queryFn: () => sdk.adminFindManyFaqItem({ input }).then((res) => res.data),
  })
  const items = query.data?.items ?? []

  return {
    items,
    query,
    setSearch,
    createFaqItem: (input: FaqItemAdminCreateInput) =>
      sdk
        .adminCreateFaqItem({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            toastSuccess(`FaqItem created`)
          } else {
            toastError(`FaqItem not created`)
          }
          return res.created
        })
        .catch((err) => {
          toastError(err.message)
          return undefined
        }),
    deleteFaqItem: (faqItemId: string) =>
      sdk.adminDeleteFaqItem({ faqItemId }).then(() => {
        toastSuccess('FaqItem deleted')
        return query.refetch()
      }),
  }
}
