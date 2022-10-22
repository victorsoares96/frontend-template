import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

interface Props {
  children: React.ReactNode;
  methods: UseFormReturn;
  onSubmit?: (e?: React.BaseSyntheticEvent) => void;
}

function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
}

FormProvider.defaultProps = {
  onSubmit: undefined,
};

export default FormProvider;
