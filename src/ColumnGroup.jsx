import React from 'react';
import PropTypes from 'prop-types';
import RcTable from 'rc-table';

export interface ColumnGroupProps {
  title: PropTypes.node
}

export default class ColumnGroup extends RcTable.ColumnGroup {}
