import { NotificationProvider } from '@pankod/refine-core';
import { showNotification, hideNotification } from '@mantine/notifications';
import { Check, X } from 'tabler-icons-react';

export const notificationProvider: NotificationProvider = {
  open: (params) => {
    let notificationType: {
      icon: React.ReactNode;
      color: string;
      loading?: boolean;
    } = {
      icon: <Check size={18} />,
      color: 'teal',
    };

    if (params.type === 'error') {
      notificationType = {
        icon: <X size={18} />,
        color: 'red',
      };
    } else if (params.type === 'progress') {
      notificationType = {
        icon: null,
        color: 'blue',
        loading: true,
      };
    }

    showNotification({
      title: params.message,
      message: params.description,
      key: params.key,
      ...notificationType,
    });
  },
  close: (key) => {
    hideNotification(key);
  },
};
