import { useReducer } from 'react';

interface TypeUseForm {
  <T>(initialForm: T): [T, (states: Partial<typeof initialForm>) => void];
}

const useForm: TypeUseForm = (initialForm) => {
  const [form, dispatchForm] = useReducer((acc: typeof initialForm, cur: Partial<typeof initialForm>) => {
    return { ...acc, ...cur };
  }, initialForm);

  return [form, dispatchForm];
};

export default useForm;
