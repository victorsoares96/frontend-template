import { useState } from 'react';

export default function useTabs<T>(defaultValues: T) {
  const [currentTab, setCurrentTab] = useState<T | string>(defaultValues || '');

  return {
    currentTab,
    onChangeTab: (_: unknown, newValue: T) => {
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
