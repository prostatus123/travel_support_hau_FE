import React from 'react';
import '../../style/style.scss';
import '../../style/searchplace.scss'


export default function Search({ search, handleActivePage, text, handleText }) {
    return (
        <>
            <div className="wrapper__search--place container">
                <div className="row">
                    <div className="col-12 col__search">
                        <div className="wrapper">
                            <div className="col-9 input__search">
                                <input placeholder="Bạn Muốn Đi Đâu?"
                                    value={text}
                                    onChange={e => handleText(e.target.value)}
                                />
                                <i className="fa fa-search"></i>
                            </div>
                            <div className="col-3 wrapper__btn"
                                style={{ cursor: 'pointer', }}
                                onClick={() => {
                                    search()
                                    handleActivePage(1)
                                }}
                            >
                                <span className="search__btn">
                                    Tìm Kiếm
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}