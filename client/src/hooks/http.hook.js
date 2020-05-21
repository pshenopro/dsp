import {useCallback, useState} from 'react';

export const useHttp = () => {
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(null);

    const req = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoad(true);

        try {
            if(body) {
                body = JSON.stringify(body);
                headers['content-type'] = 'application/json';
            }

            const res = await fetch(url, {method, body, headers});
            const data = await res.json();

            setLoad(false);

            return data
        } catch (e) {
            setLoad(false);
            setErr(e.message);
            throw new Error(e.message);
        }
    }, []);

    const clear = useCallback(() => {
        setErr(null)
    }, []);

    return {load, req, err, clear}
}