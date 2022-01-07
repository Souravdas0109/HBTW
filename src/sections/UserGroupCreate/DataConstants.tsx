const formattedDate = () => {
  return new Date().toISOString().split('T')[0]
}

export interface LocationhierarchyTypes {
  readonly value: string
  readonly label: string
  readonly hierarchyLevel: string
  readonly hierarchyId: string
  readonly startDate: string
  readonly endDate: string
}

export const locationTypes: LocationhierarchyTypes[] = [
  {
    value: 'Online',
    label: 'Online',
    hierarchyLevel: 'channel',
    hierarchyId: 'Online',
    startDate: formattedDate(),
    endDate: '2099-12-31',
  },
  {
    value: 'Wholesale',
    label: 'Wholesale',
    hierarchyLevel: 'channel',
    hierarchyId: 'Wholesale',
    startDate: formattedDate(),
    endDate: '2099-01-01',
  },
  {
    value: 'Retail',
    label: 'Retail',
    hierarchyLevel: 'channel',
    hierarchyId: 'Retail',
    startDate: formattedDate(),
    endDate: '2099-01-01',
  },
]

export const constants = {
  groupstatuses: [
    {
      statusID: 'A',
      text: 'ACTIVE',
    },
    {
      statusID: 'I',
      text: 'INACTIVE',
    },
    {
      statusID: 'D',
      text: 'DELETED',
    },
  ],

  mainvalues: [
    { value: 'none', label: 'Select..' },
    { value: 'division', label: 'Division' },
    { value: 'group', label: 'Trading Group' },
    { value: 'category', label: 'Category' },
    { value: 'department', label: 'Product Group' },
    { value: 'class', label: 'Class' },
    { value: 'subclass', label: 'Sub Class' },
  ],
}
