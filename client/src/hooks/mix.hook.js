import {useState} from 'react'

export const useMix = (data) => {
    const [sstate, setState] = useState(data);

    const onlyNumber = (evt) => {
        evt = (evt) ? evt : window.event;
        let num = evt.target.value.toString() + evt.key.toString();

        if (!/^[0-9]*\.?[0-9]*$/.test(num)) {
            evt.preventDefault();
        }
    }

    const changeInpIntg = (event) => {
        event.persist();

        if (event.target.value === '') {
            setState(prev => ({...prev, ...{[event.target.name]: 0}}));
            return
        }

        setState(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: parseInt(event.target.value)
                }
            })
        )
    };

    const changeInp = (event) => {
        event.persist();

        setState(
            prev => ({
                ...prev,
                ...{
                    [event.target.name]: event.target.value
                }
            })
        )
    };

    return {changeInpIntg, changeInp, onlyNumber, sstate}
}

