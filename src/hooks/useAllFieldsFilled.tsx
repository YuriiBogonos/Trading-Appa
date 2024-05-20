import { useEffect, useState } from 'react';

import { FormikTouched } from 'formik';

import { TradeRequest } from '@/api/OpenTrade/OpenTrade.ts';

type NewTableDataKeys = keyof TradeRequest;
export const useAllFieldsFilled = (
  formikValues: TradeRequest,
  formikTouched: FormikTouched<TradeRequest>,
  initialValues: TradeRequest,
  requiredFields: NewTableDataKeys[]
): boolean => {
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
