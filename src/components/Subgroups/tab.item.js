import React from 'react'
import PropTypes from 'prop-types';

const Item = ({target, changePos, handlerModal, keyItem}) => {


    return (
        <div className={`item ${keyItem}-label`}>
            <div className="item-inner">
                <div className="line">
                    <h6>apps:</h6>
                    <span>{Object.keys(target).length ? target.apps.length : 0} приложений</span>
                    <label
                        htmlFor={keyItem + 'new'}
                        className={'waves-effect waves-light btn-small'}>
                        <input id={keyItem + 'new'}
                               type="file"
                               onChange={(event) => changePos(event, `${keyItem}Apps`, '')}
                               accept="text/plain"
                               hidden />
                        добавить
                    </label>
                    <label
                        htmlFor={keyItem + 'add'}
                        className={`waves-effect waves-light btn-small rewrite ${!Object.keys(target).length || !target.apps.length ? 'blocked' : ''}`}>
                        <input id={keyItem + 'add'}
                               type="file"
                               onChange={(event) => changePos(event, `${keyItem}Apps`, true)}
                               disabled={!Object.keys(target).length || !target.apps.length}
                               accept="text/plain"
                               hidden />
                        Перезаписать
                    </label>
                    <button type={'button'}
                            className={'waves-effect waves-light btn-small'}
                            disabled={!Object.keys(target).length || !target.apps.length}
                            onClick={() => handlerModal(`${keyItem}apps`)}>
                        просмотр
                    </button>
                </div>
                <div className="line">
                    <h6>domains:</h6>
                    <span>{Object.keys(target).length ? target.domains.length : 0} доменов</span>
                    <label
                        htmlFor={keyItem + 'newD'}
                        className={'waves-effect waves-light btn-small'}>
                        <input
                            id={keyItem + 'newD'}
                            type="file"
                            onChange={(event) => changePos(event, `${keyItem}Domains`, '')}
                            accept="text/plain"
                            hidden />
                        добавить
                    </label>
                    <label
                        htmlFor={keyItem + 'addD'}
                        className={`waves-effect waves-light btn-small rewrite ${!Object.keys(target).length || !target.domains.length ? 'blocked' : ''}`}>
                        <input id={keyItem + 'addD'}
                               type="file"
                               onChange={(event) => changePos(event, `${keyItem}Domains`, true)}
                               disabled={!Object.keys(target).length || !target.domains.length}
                               accept="text/plain"
                               hidden />
                        Перезаписать
                    </label>
                    <button type={'button'}
                            className={'waves-effect waves-light btn-small'}
                            disabled={!Object.keys(target).length || !target.domains.length}
                            onClick={() => handlerModal(`${keyItem}domains`)}>
                        просмотр
                    </button>
                </div>
                <div className="line">
                    <div className="geo">
                        <h6>geo:</h6>
                        <div className={'geo-inner'}>{Object.keys(target).length ? JSON.stringify(target.geo) : 'Пусто'}</div>
                    </div>
                    <div className="os-type">
                        <h6>os:</h6>
                        <ul>
                            {Object.keys(target).length && target.os ? target.os.map((elem, index) => <li key={index}>{elem}</li>) : <li>Пусто</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

Item.propType = {
    target: PropTypes.object,
    changePos: PropTypes.func,
    handlerModal: PropTypes.func,
    keyItem: PropTypes.string,
}

export default Item;