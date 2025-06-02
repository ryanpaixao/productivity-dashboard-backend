const DATE_GRANULARITY = {
  INTER_DAY: 'interday',
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly'
};

const TIME_UNIT = {
  interday: 'day',
  daily: 'day',
  weekly: 'week',
  monthly: 'month'
};

const NUM_OF_DAYS = {
  interday: 1,
  daily: 30,
  weekly: 7,
  monthly: 12,
  yearly: 365
};

export { DATE_GRANULARITY, NUM_OF_DAYS, TIME_UNIT };
