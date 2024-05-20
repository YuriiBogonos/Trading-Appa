import React from 'react';

import { Field, Form, Formik } from 'formik';

import ErrorMessage from '@/components/HomeComponents/ValidationMetricField/ErrorMessage.tsx';
import { Root } from '@/types/types.ts';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import './ValidationMetricFieldStyle.scss';

interface ValidationMetricFieldProps {
  onValidHotkeyChange: (isValid: boolean, thirtyDayReturns?: number, minerHotkey?: string) => void;
  checkpointData: Root | undefined;
}

const CustomTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: '#f7f6f3',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#9e3909',
    },
    '&:hover fieldset': {
      borderColor: '#9e3909',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9e3909',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#9e3909',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#9e3909',
  },
});

const ValidationMetricField: React.FC<ValidationMetricFieldProps> = ({
  onValidHotkeyChange,
  checkpointData,
}) => {
  const validateMetric = (minerKey: string) => {
    if (!checkpointData || !checkpointData.positions[minerKey]) {
      onValidHotkeyChange(false);
      return 'invalid';
    }

    const positionData = checkpointData.positions[minerKey];

    if (positionData) {
      const { thirty_day_returns } = positionData;
      onValidHotkeyChange(true, thirty_day_returns, minerKey);
    } else {
      onValidHotkeyChange(false);
    }
  };

  return (
    <Formik
      initialValues={{ minerHotkey: '' }}
      validate={(values) => {
        const errors: { minerHotkey?: React.ReactNode } = {};
        const isValid = validateMetric(values.minerHotkey);
        if (isValid === 'invalid') {
          errors.minerHotkey = <ErrorMessage />;
        }
        return errors;
      }}
      onSubmit={() => {}}
    >
      {({ errors, touched }) => (
        <Form className='form'>
          <Field
            as={CustomTextField}
            name='minerHotkey'
            label='Miner Hotkey'
            variant='outlined'
            sx={{ width: '35%', margin: '1%' }}
            error={touched.minerHotkey && Boolean(errors.minerHotkey)}
            helperText={touched.minerHotkey && errors.minerHotkey}
          />
        </Form>
      )}
    </Formik>
  );
};

export default ValidationMetricField;
