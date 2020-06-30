export const ORDER_STATUTES = [
  'Declined',
  'Accepted',
  'In progress'
];

export const ORDER_CODE_STATUTES = {
  DECLINED: 0,
  ACCEPTED: 1,
  IN_PROGRESS: 2,
}

export function getStatus(code: number) {
  return ORDER_STATUTES[code];
}

export function getStatusColor(code: number) {
  if (code === 0) {
    return 'red';
  }

  if (code === 1) {
    return 'green'
  }

  if (code === 2) {
    return 'blue'
  }

  return 'blue';
}
