import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getEstimateById, updateEstimateById } from 'apiSdk/estimates';
import { Error } from 'components/error';
import { estimateValidationSchema } from 'validationSchema/estimates';
import { EstimateInterface } from 'interfaces/estimate';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function EstimateEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<EstimateInterface>(
    () => (id ? `/estimates/${id}` : null),
    () => getEstimateById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: EstimateInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateEstimateById(id, values);
      mutate(updated);
      resetForm();
      router.push('/estimates');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<EstimateInterface>({
    initialValues: data,
    validationSchema: estimateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Estimate
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="time_plan" mb="4" isInvalid={!!formik.errors?.time_plan}>
              <FormLabel>Time Plan</FormLabel>
              <Input type="text" name="time_plan" value={formik.values?.time_plan} onChange={formik.handleChange} />
              {formik.errors.time_plan && <FormErrorMessage>{formik.errors?.time_plan}</FormErrorMessage>}
            </FormControl>
            <FormControl id="staff_management" mb="4" isInvalid={!!formik.errors?.staff_management}>
              <FormLabel>Staff Management</FormLabel>
              <Input
                type="text"
                name="staff_management"
                value={formik.values?.staff_management}
                onChange={formik.handleChange}
              />
              {formik.errors.staff_management && <FormErrorMessage>{formik.errors?.staff_management}</FormErrorMessage>}
            </FormControl>
            <FormControl id="tasks" mb="4" isInvalid={!!formik.errors?.tasks}>
              <FormLabel>Tasks</FormLabel>
              <Input type="text" name="tasks" value={formik.values?.tasks} onChange={formik.handleChange} />
              {formik.errors.tasks && <FormErrorMessage>{formik.errors?.tasks}</FormErrorMessage>}
            </FormControl>
            <FormControl id="expenses" mb="4" isInvalid={!!formik.errors?.expenses}>
              <FormLabel>Expenses</FormLabel>
              <Input type="text" name="expenses" value={formik.values?.expenses} onChange={formik.handleChange} />
              {formik.errors.expenses && <FormErrorMessage>{formik.errors?.expenses}</FormErrorMessage>}
            </FormControl>
            <FormControl id="approval_summary" mb="4" isInvalid={!!formik.errors?.approval_summary}>
              <FormLabel>Approval Summary</FormLabel>
              <Input
                type="text"
                name="approval_summary"
                value={formik.values?.approval_summary}
                onChange={formik.handleChange}
              />
              {formik.errors.approval_summary && <FormErrorMessage>{formik.errors?.approval_summary}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrganizationInterface>
              formik={formik}
              name={'organization_id'}
              label={'Select Organization'}
              placeholder={'Select Organization'}
              fetcher={getOrganizations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'estimate',
  operation: AccessOperationEnum.UPDATE,
})(EstimateEditPage);
