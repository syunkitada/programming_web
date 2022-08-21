import * as React from 'react';
import { useState, useTransition } from 'react';


function Spinner() {
    return (<div>spinner</div>)
}

function CounterForTransition() {
    const [isPending, startTransition] = useTransition();
    const [count, setCount] = useState(0);

    function handleClick() {
        startTransition(() => {
            setCount(c => c + 1);
        })
    }

    return (
        <div>
            {isPending && <Spinner />}
            <button onClick={handleClick}>{count}</button>
        </div>
    );
}

export {
    CounterForTransition
}
