import * as yup from 'yup';

export const estimateValidationSchema = yup.object().shape({
  time_plan: yup.string().required(),
  staff_management: yup.string().required(),
  tasks: yup.string().required(),
  expenses: yup.string().required(),
  approval_summary: yup.string().required(),
  organization_id: yup.string().nullable(),
});
