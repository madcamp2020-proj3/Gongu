import React, { useEffect, useState } from 'react'

const PREFIX = 'login-information';

export default function useLoginStorage(initialValue = false) {
    const prefixedKey = PREFIX;
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey);
        if (jsonValue != null) return JSON.parse(jsonValue);
        if (typeof initialValue === 'function') {
            return initialValue();
        } else {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value));
    }, [prefixedKey, value]);

    return [value, setValue];
}
