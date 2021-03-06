import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import { react2angular } from 'react2angular';
import DatePicker from 'antd/lib/date-picker';
import { clientConfig } from '@/services/auth';

export function DateInput({
  value,
  onSelect,
  className,
}) {
  const format = clientConfig.dateFormat || 'YYYY-MM-DD';
  const additionalAttributes = {};
  if (value && value.isValid()) {
    additionalAttributes.defaultValue = value;
  }
  return (
    <DatePicker
      className={className}
      {...additionalAttributes}
      format={format}
      placeholder="Select Date"
      onChange={onSelect}
    />
  );
}

DateInput.propTypes = {
  value: (props, propName, componentName) => {
    const value = props[propName];
    if ((value !== null) && !moment.isMoment(value)) {
      return new Error('Prop `' + propName + '` supplied to `' + componentName +
        '` should be a Moment.js instance.');
    }
  },
  onSelect: PropTypes.func,
  className: PropTypes.string,
};

DateInput.defaultProps = {
  value: null,
  onSelect: () => {},
  className: '',
};

export default function init(ngModule) {
  ngModule.component('dateInput', react2angular(DateInput));
}

init.init = true;
