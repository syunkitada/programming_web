import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { CounterForState } from './use_state';
import { FetchViewForEffect } from './use_effect_for_fetch';
import { CounterForReducer } from './use_reducer';
import { CounterForTransition } from './use_transition';


ReactDOM.createRoot(document.getElementById('counter-for-state')).render(<CounterForState />);

ReactDOM.createRoot(document.getElementById('fetch-view-for-effect')).render(<FetchViewForEffect />);

ReactDOM.createRoot(document.getElementById('counter-for-reducer')).render(<CounterForReducer initialCount={0} />);


ReactDOM.createRoot(document.getElementById('counter-for-transition')).render(<CounterForTransition />);

