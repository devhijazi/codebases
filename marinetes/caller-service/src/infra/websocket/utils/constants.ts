export enum Events {
  connection = 'connection',
  disconnect = 'disconnect',

  solicitationFound = 'solicitationFound', // diarist
  solicitationWaitingAccept = 'solicitationWaitingAccept', // user
  solicitationCanceled = 'solicitationCanceled', // user and diarist
  solicitationAccepted = 'solicitationAccepted', // user

  scheduleWaitingConfirmation = 'scheduleWaitingConfirmation', // diarist
  scheduleDenied = 'scheduleDenied', // user
  scheduleConfirmed = 'scheduleConfirmed', // user
  scheduleDoned = 'scheduleDoned', // user and diarist
  scheduleCanceled = 'scheduleCanceled', // user and diarist
}
