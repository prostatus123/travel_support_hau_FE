import React, { useEffect, useState } from 'react';
import API, { BASE_URL_DOWNLOAD } from '../../../lib/API';
import ModalDetail from './ModalDetail';
import ModalUpdate from './ModalUpdate';
export default function Item({ data, index, search }) {
    let [showDetail, setShowDetail] = useState(false);
    const handleShowDetail = () => {
        setShowDetail(true)
    }
    const handleCloseDetail = () => {
        setShowDetail(false)
    }
    let [showUpdate, setShowUpdate] = useState(false);
    const handleShowUpdate = () => {
        setShowUpdate(true)
    }
    const handleCloseUpdate = () => {
        setShowUpdate(false)
    }
    const [post, setPost] = useState()

    useEffect(() => {
        fetchData()
    }, [data])
    let fetchData = async () => {
        let path = `/customer/post/detail?postId=${data?.id}`;
        let resp = await API.authorizedJSONGET(path);
        if (resp.ok) {
            let response = await resp.json();
            setPost(response)
        }
    }
    const deleteItem = async () => {
        let message = window.confirm("Bạn chắc chắn muốn xóa bài viết?");
        if (message) {
            let path = `/content/post/delete?postId=${data?.id}`;
            let resp = await API.authorizedJSONDelete(path);
            if (resp.ok) {
                search()
            }
        }

    }
    return (
        <>
            <tr >
                <td className="text-center" style={{ verticalAlign: 'middle' }}>{index}</td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                    {post?.title}
                </td>
                <td className="text-center" style={{ verticalAlign: 'middle' }}>
                    <p className="description__content">
                        {post?.content}
                    </p>
                </td>

                <td className="text-center" style={{ verticalAlign: 'middle' }} >
                    {data?.image &&

                        <img src={`${BASE_URL_DOWNLOAD}${data?.image}`} alt=""
                            style={{ width: 150, height: 50 }}
                        />
                    }
                </td>

                <td style={{ verticalAlign: 'middle' }} className="btn__setting">

                    <button
                        onClick={() => { setShowDetail(true) }}
                    >
                        <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24" color="#dc3545">
                            <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z" />
                        </svg>
                    </button>
                    <ModalDetail handleClose={handleCloseDetail} handleShow={handleShowDetail} show={showDetail} data={data} />
                    <button
                        onClick={() => { setShowUpdate(true) }}
                    >
                        <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24" color="#00a6d9">
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12H20A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4V2M18.78,3C18.61,3 18.43,3.07 18.3,3.2L17.08,4.41L19.58,6.91L20.8,5.7C21.06,5.44 21.06,5 20.8,4.75L19.25,3.2C19.12,3.07 18.95,3 18.78,3M16.37,5.12L9,12.5V15H11.5L18.87,7.62L16.37,5.12Z" />
                        </svg>
                    </button>
                    <ModalUpdate handleClose={handleCloseUpdate} handleShow={handleShowUpdate} show={showUpdate} data={data} search={search}
                       
                        
                    />

                    <button
                        onClick={() => deleteItem()}
                    >
                        <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24" color="#65676b">
                            <path fill="currentColor" d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z" />
                        </svg>
                    </button>
                </td>
            </tr>

        </>
    )
}