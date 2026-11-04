import {
  Text, Card, SectionHeading, ListItem, Table, Tile, KeyValue,
  DataRow, Avatar, Badge, Icon,
} from '../../design-system'

const tableData = [
  { name: 'Alice', role: 'Engineer', status: 'Active' },
  { name: 'Bob', role: 'Designer', status: 'Away' },
  { name: 'Carol', role: 'Manager', status: 'Active' },
  { name: 'Dave', role: 'Analyst', status: 'Offline' },
]

export default function DataPage() {
  return (
    <div className="space-y-8">
      <div>
        <Text variant="display">Data Display</Text>
        <Text variant="body" className="text-ds-text-secondary mt-2">
          ListItem, Table, Tile, KeyValue, DataRow, and SectionHeading.
        </Text>
      </div>

      <SectionHeading title="List Items" />
      <Card variant="outlined">
        <ListItem
          leading={<Avatar size="sm" initials="AJ" />}
          title="Alice Johnson"
          subtitle="Engineering Lead"
          trailing={<Badge variant="success" size="sm" value="Active" />}
          pressable
        />
        <ListItem
          leading={<Avatar size="sm" initials="BS" />}
          title="Bob Smith"
          subtitle="Product Designer"
          trailing={<Badge size="sm" value="Away" />}
          pressable
        />
      </Card>

      <SectionHeading title="Table" />
      <Table
        columns={[
          { key: 'name', label: 'Name', sortable: true },
          { key: 'role', label: 'Role', sortable: true },
          { key: 'status', label: 'Status', render: (row) => (
            <Badge variant={row.status === 'Active' ? 'success' : 'default'} size="sm" value={String(row.status)} />
          )},
        ]}
        data={tableData}
        selectable
      />

      <SectionHeading title="Tiles" />
      <div className="grid grid-cols-3 gap-3">
        <Tile icon={<Icon name="user" size={28} />} title="Users" description="1,284" pressable />
        <Tile icon={<Icon name="chat" size={28} />} title="Messages" description="842" pressable />
        <Tile icon={<Icon name="folder" size={28} />} title="Projects" description="36" pressable />
      </div>

      <SectionHeading title="Key-Value" />
      <Card variant="outlined" className="p-5 space-y-2">
        <Text variant="label" className="mb-2">Inline Layout</Text>
        <KeyValue label="Company" value="Duck Inc." />
        <KeyValue label="Founded" value="2024" />
        <KeyValue label="Employees" value="42" />
      </Card>
      <div className="grid grid-cols-3 gap-4">
        <KeyValue label="Revenue" value="$1.2M" layout="stacked" />
        <KeyValue label="Growth" value="+24%" layout="stacked" />
        <KeyValue label="ARR" value="$850K" layout="stacked" />
      </div>

      <SectionHeading title="Data Rows" />
      <Card variant="outlined" className="p-5 space-y-1">
        <DataRow label="Revenue" value="$12,450" trend="up" trendValue="12%" />
        <DataRow label="Users" value="1,284" trend="up" trendValue="8%" />
        <DataRow label="Churn Rate" value="2.1%" trend="down" trendValue="0.3%" />
        <DataRow label="NPS Score" value="72" trend="neutral" />
      </Card>
    </div>
  )
}
