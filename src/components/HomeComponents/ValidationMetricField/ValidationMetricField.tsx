import React from 'react';

import { Field, Form, Formik } from 'formik';

import ErrorMessage from '@/components/HomeComponents/ValidationMetricField/ErrorMessage.tsx';
import { TextField } from '@mui/material';

import { positions } from '../../../mock/positions.ts';
import './ValidationMetricFieldStyle.scss';

interface ValidationMetricFieldProps {
  onValidHotkeyChange: (isValid: boolean, thirtyDayReturns?: number, minerHotkey?: string) => void;
}

const ValidationMetricField: React.FC<ValidationMetricFieldProps> = ({ onValidHotkeyChange }) => {
  const validateMetric = (value: string) => {
    let exists = false;
    let thirtyDayReturns: number | undefined = undefined;

    const position = positions.find((p) => Object.keys(p).includes(value));
    if (position) {
      exists = true;
      thirtyDayReturns = position[value].thirty_day_returns;
    }

    onValidHotkeyChange(exists, thirtyDayReturns, value);
    return exists ? undefined : 'invalid';
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
            as={TextField}
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
