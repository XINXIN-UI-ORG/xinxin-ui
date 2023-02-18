export type AlertType = 'info' | 'success' | 'warning' | 'error';

export type AlertOptions = {
  message: string,

  style?: AlertStyle,

  type: AlertType,

  duration?: number,
};

export interface AlertClose {
  (): void;
}

export type AlertStyle = 'technology' | 'simple';