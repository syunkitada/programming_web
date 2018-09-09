import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Counter extends Component {
  constructor(props) {
    super(props)
    console.log('called Counter constructor')
  }

  render() {
    const { value, onIncrement, onDecrement, onIncrementAsync } = this.props
    console.log('render')

    return (
      <div>
        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <hr />
        <div>
          Clicked: {value} times
        </div>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  console.log(state)
  const value = state

  return {
    value
  }
}

export default connect(mapStateToProps)(Counter)
