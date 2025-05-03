import { Store } from 'redux';
import type { RootState, AppDispatch } from '../store/types';

/**
 * Параметры маршрута
 * @property {string | undefined} [key] - Динамические параметры маршрута
 */
export type RouteParams = {
  [key: string]: string | undefined;
};

/**
 * Аргументы для инициализации страницы
 * @property {Store} store - Redux store
 * @property {RouteParams} params - Параметры маршрута
 * @property {URLSearchParams} searchParams - Параметры запроса
 */
export type PageInitArgs = {
  store: Store;
  params: RouteParams;
  searchParams: URLSearchParams;
};

/**
 * Маршрут приложения
 * @property {string} path - Путь маршрута
 * @property {React.ReactNode} element - React компонент для отображения
 * @property {(args: PageInitArgs) => Promise<void>} [init] - Функция инициализации страницы
 */
export type Route = {
  path: string;
  element: React.ReactNode;
  init?: (args: PageInitArgs) => Promise<void>;
};

/**
 * Тип для хука useSelector
 * @template TSelected - Тип возвращаемого значения
 */
export type UseSelectorHook = <TSelected = unknown>(
  selector: (state: RootState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

/**
 * Тип для хука useDispatch
 */
export type UseDispatchHook = () => AppDispatch; 
