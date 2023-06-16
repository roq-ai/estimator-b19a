import * as yup from 'yup';

export const expenseValidationSchema = yup.object().shape({
  description: yup.string().required(),
  amount: yup.number().integer().required(),
  estimate_id: yup.string().nullable(),
});
