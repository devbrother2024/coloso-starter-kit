import 'valtio';

declare module 'valtio' {
  function useSnapshot<T extends object, O>(p: T, o?: O): T;
}
