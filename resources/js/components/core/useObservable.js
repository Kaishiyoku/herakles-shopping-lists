import {useEffect, useState} from 'react';
import noop from '../../core/noop';

const useObservable = (observable, initialValue = null, callback = noop) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        const subscription = observable.subscribe((newValue) => {
            setValue(newValue);

            callback(newValue);
        });
        return () => subscription.unsubscribe();
    }, []);

    return value;
};

export default useObservable;
