import {useCallback, useState} from 'react';
import {connect} from 'react-redux'

export const useHttp = (preloader) => {
    const [load, setLoad] = useState(false);
    const [err, setErr] = useState(null);

    const req = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        preloader(true)

        try {
            if(body) {
                body = JSON.stringify(body);
                headers['content-type'] = 'application/json';
            }

            const res = await fetch(url, {method, body, headers});
            const data = await res.json();

            preloader(false)

            return data
        } catch (e) {
            preloader(false)
            console.log(e)
            setErr(e.message);
            throw new Error(e.message);
        }
    }, []);

    const clear = useCallback(() => {
        setErr(null)
    }, []);

    return {load, req, err, clear}
}
