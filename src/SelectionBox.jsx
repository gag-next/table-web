import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@gag/checkbox-web';
import Radio from '@gag/radio-web';

class SelectionBox extends React.Component{
  unsubscribe: () => void;

  constructor(props) {
    super(props);

    this.state = {
      checked: this.getCheckState(props),
    };
  }

  componentDidMount() {
    this.subscribe();
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  subscribe() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => {
      const checked = this.getCheckState(this.props);
      this.setState({ checked });
    });
  }

  getCheckState(props) {
    const { store, defaultSelection, rowIndex } = props;
    let checked = false;
    if (store.getState().selectionDirty) {
      checked = store.getState().selectedRowKeys.indexOf(rowIndex) >= 0;
    } else {
      checked = (store.getState().selectedRowKeys.indexOf(rowIndex) >= 0 ||
                 defaultSelection.indexOf(rowIndex) >= 0);
    }
    return checked;
  }

  render() {
    const { type, rowIndex, disabled, onChange } = this.props;
    const { checked } = this.state;

    if (type === 'radio') {
      return (
        <Radio
          disabled={disabled}
          onChange={onChange}
          value={rowIndex}
          checked={checked}
        />
      );
    }

    return (
      <Checkbox
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }
}
SelectionBox.propTypes = {
  store:PropTypes.shape({
    setState: PropTypes.func,
    getState: PropTypes.func,
    subscribe: PropTypes.func,
  }),
  type: PropTypes.string,
  defaultSelection:PropTypes.arrayOf(PropTypes.string),
  rowIndex: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
SelectionBox.displayName = "SelectionBox";
module.exports=SelectionBox;
