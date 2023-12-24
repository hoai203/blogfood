import React from 'react';
import { Select } from 'antd';

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log('search:', value);
};
// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
const SelectAnt = ({ data }) => {
  const datas = [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'tom',
      label: 'Tom',
    },
  ]
  return (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={filterOption}
      options={datas}
    />
  );
};

export default SelectAnt;
