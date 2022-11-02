import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@/store/types';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
