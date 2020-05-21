import React, {useState} from "react";

export default () => {
    const [state, setState] = useState({
        name: '',
    });

    let changeInp = (event, name) => {
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

    return <input type="text" name="name" value={state.name} onChange={changeInp} autoComplete={'off'} />
}