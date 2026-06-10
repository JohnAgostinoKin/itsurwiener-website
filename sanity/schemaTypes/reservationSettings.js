export default {
  name: 'reservationSettings',
  title: 'Reservation Settings',
  type: 'document',
  fields: [
    { name: 'depositRequired', title: 'Deposit Required?', type: 'boolean', initialValue: false },
    { name: 'depositAmount',   title: 'Deposit Amount ($)', type: 'number' },
    { name: 'depositNote',     title: 'Deposit Note', type: 'string', description: 'e.g. Required for parties of 6 or more' },
    { name: 'availableTimes',  title: 'Available Times', type: 'array', of: [{ type: 'string' }], description: 'e.g. 11:00 AM, 12:00 PM, etc.' },
    { name: 'maxPartySize',    title: 'Max Party Size (dropdown)', type: 'number', initialValue: 20 },
    { name: 'note',            title: 'Notice / Message', type: 'text', description: 'Shown at top of form — e.g. game day hours, special policies' },
  ],
}
