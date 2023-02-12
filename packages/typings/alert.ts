export type AlertType = 'info' | 'success' | 'warning' | 'error';

export type AlertOptions = {
  message: string,

  title?: string,

  type: AlertType,
};

export interface AlertClose {
  (): void;
}