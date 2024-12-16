export type ToastType = 'success' | 'error';
export type ToastModel = {
  duration?: number;
  message: string;
  type: ToastType;
};
