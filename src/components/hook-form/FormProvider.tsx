import { FormProvider as Form } from 'react-hook-form';

interface Props {
  children: React.ReactNode;
  methods: object;
  onSubmit?: (data: unknown) => void;
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
