import { useState } from 'react';
import type { Column } from 'features/types';
import type { UseColumnManager } from './useColumnManager';

export const useColumnEditModalManager = (manager: UseColumnManager) => {
  const [currentIndex, setIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [field, setField] = useState<Column>({ name: '', description: '', type: '' });
  const { add, get, update } = manager;

  const open = (index: number | null) => {
    setIndex(index);
    setField(get(index ?? -1));
    setIsOpen(true);
  };

  return {
    isOpen,
    field,
    setField,
    new: () => {
      open(null);
    },
    edit: (index: number) => {
      open(index);
    },
    close: () => {
      setIsOpen(false);
      setField({
        name: '',
        description: '',
        type: '',
      });
    },
    save: () => {
      if (currentIndex === null) {
        add(field);
      } else {
        update(currentIndex, field ?? {});
      }
    },
  };
};

export type UseColumnEditModalManager = ReturnType<typeof useColumnEditModalManager>;
