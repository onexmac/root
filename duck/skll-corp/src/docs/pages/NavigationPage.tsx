import { useState } from 'react'
import {
  Text, Card, SectionHeading, Tabs, Breadcrumbs, Pagination,
  NavPill, Icon, PageHeader, Button,
} from '../../design-system'

export default function NavigationPage() {
  const [tab, setTab] = useState('one')
  const [page, setPage] = useState(3)

  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Navigation</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          Tabs, Breadcrumbs, Pagination, NavPill, SideNav, BottomNav, and PageHeader.
        </Text>
      </div>

      <SectionHeading title="Tabs — Line" />
      <Tabs
        items={[
          { id: 'one', label: 'Tab One' },
          { id: 'two', label: 'Tab Two', badge: 3 },
          { id: 'three', label: 'Tab Three' },
        ]}
        activeId={tab}
        onChange={setTab}
      />

      <SectionHeading title="Tabs — Pill" />
      <Tabs
        items={[
          { id: 'one', label: 'All' },
          { id: 'two', label: 'Active' },
          { id: 'three', label: 'Completed' },
        ]}
        variant="pill"
      />

      <SectionHeading title="Tabs — Enclosed" />
      <Tabs
        items={[
          { id: 'one', label: 'Day' },
          { id: 'two', label: 'Week' },
          { id: 'three', label: 'Month' },
        ]}
        variant="enclosed"
      />

      <SectionHeading title="Breadcrumbs" />
      <Card variant="outlined" className="p-5 space-y-4">
        <Breadcrumbs items={[
          { label: 'Home', onClick: () => {} },
          { label: 'Products', onClick: () => {} },
          { label: 'Category', onClick: () => {} },
          { label: 'Item' },
        ]} />
        <Breadcrumbs
          items={[
            { label: 'Root', onClick: () => {} },
            { label: 'A', onClick: () => {} },
            { label: 'B', onClick: () => {} },
            { label: 'C', onClick: () => {} },
            { label: 'D', onClick: () => {} },
            { label: 'Current' },
          ]}
          maxItems={3}
          separator="slash"
        />
      </Card>

      <SectionHeading title="Pagination" />
      <Card variant="outlined" className="p-5 space-y-4">
        <Pagination currentPage={page} totalPages={20} onPageChange={setPage} />
        <Pagination currentPage={page} totalPages={20} onPageChange={setPage} variant="simple" />
      </Card>

      <SectionHeading title="Nav Pill" />
      <Card variant="outlined" className="p-5 flex gap-2 flex-wrap">
        <NavPill icon={<Icon name="home" size={16} />} label="Home" active />
        <NavPill icon={<Icon name="chat" size={16} />} label="Messages" count={12} />
        <NavPill icon={<Icon name="user" size={16} />} label="Profile" />
        <NavPill icon={<Icon name="config" size={16} />} label="Settings" />
      </Card>

      <SectionHeading title="Page Header" />
      <Card variant="outlined">
        <PageHeader
          title="Settings"
          subtitle="Manage your preferences"
          backAction={() => {}}
          actions={<Button size="sm">Save</Button>}
        />
      </Card>
    </div>
  )
}
