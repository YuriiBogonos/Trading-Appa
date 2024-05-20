import { useEffect, useState } from 'react';

import { FormikTouched } from 'formik';

export interface TradeRequest {
  trader_id: number;
  trade_pair: string;
  order_type: string;
  leverage: number;
  asset_type: string;
  stop_loss: number;
  take_profit: number;
  test_mode: boolean;
  returnPercent?: number;
}
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
