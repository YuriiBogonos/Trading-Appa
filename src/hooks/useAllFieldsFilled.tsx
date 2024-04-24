import { useEffect, useState } from 'react';

import { FormikTouched } from 'formik';

import { NewTableData } from '@/components/HomeComponents/OpenTrades/OpenTrades.tsx';

type NewTableDataKeys = keyof NewTableData;
export const useAllFieldsFilled = (
  formikValues: NewTableData,
  formikTouched: FormikTouched<NewTableData>,
  initialValues: NewTableData,
  requiredFields: NewTableDataKeys[]
): boolean => {
  console.log('asd', formikValues);
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  useEffect(() => {
    setAllFieldsFilled(
      requiredFields.every(
        (field) => formikValues[field] !== initialValues[field] && formikValues[field] !== ''
      )
    );
  }, [formikValues, formikTouched, initialValues, requiredFields]);

  return allFieldsFilled;
};
