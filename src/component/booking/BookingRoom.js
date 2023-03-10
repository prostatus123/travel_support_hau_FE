import React, { useState } from 'react';
import '../../style/booking/booking-room.scss';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import API from '../../lib/API';
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";


export default function BookingRoom({ hotelCode, packageId }) {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const [contact, setContact] = useState({});
    const [data, setData] = useState();
    const handleChange = (e) => {
        let { value, name } = e.target;
        setContact({
            ...contact,
            [name]: value
        })
    }
    let history = useHistory();

    const [checkinDate, setCheckinDate] = useState(new Date())
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("roleId")
    const bookActivity = async (form) => {
        if (token) {
            try {
                if (roleId == 5) {
                    if (new Date(checkoutDate).getTime() > new Date(checkinDate).getTime()) {
                        let path = 'http://103.124.92.48:8888/qldv/hotel/book';
                        let objReq = {
                            hotelCode: hotelCode,
                            packageId: packageId,
                            contact: form,
                            checkinDate: Number(moment(checkinDate).format("YYYYMMDD")),
                            checkoutDate: Number(moment(checkoutDate).format("YYYYMMDD"))
                        }
                        console.log(objReq)
                        let token = localStorage.getItem("token");

                        let resp = await API.authorizedJSONBOOKPost(path, objReq, token);
                        if (resp.ok) {
                            let response = await resp.json();
                            setData(response)
                            alert("B???n ???? book th??nh c??ng!")
                            history.push({
                                pathname: '/booking-room-result',
                                state: response
                            })
                        } else {
                            alert("Vui l??ng nh???p ????? th??ng tin!")
                        }

                    } else {
                        alert("Ng??y ??? ph???i l???n h??n 1!")
                    }
                }else{
                    alert("T??i kho???n n??y kh??ng ph???i t??i kho???n kh??ch h??ng, vui l??ng t???o t??i kho???n user ????? c?? th??? booking!")
                }
            } catch (error) {

            }
        } else {
            let message = window.confirm("H??y ????ng nh???p ngay ????? tr???i nghi???m d???ch v??? c???a ch??ng t??i");
            if (message) {
                history.push('/login')

            }

        }

    }
    return (
        <>
            <div className="wrapper__booking-room" >
                {/* <div className="sign__up--text">
                    H??y <span className="sign__up"
                    onClick={() => {
                        history.push('/register')
                    }}
                    >????ng K??</span> ngay n???u b???n ch??a c?? t??i kho???n t???i Travel Support!
                </div> */}

                <form className="content__booking"
                    onSubmit={handleSubmit(bookActivity)}
                >
                    <div className="contact__info">
                        <h4 className="title">
                            Th??ng tin ?????t v??
                        </h4>
                        <hr />
                        <div className="content">
                            <div className="name__info item">
                                <label for="name">H???</label>
                                <input type="text"
                                    {...register("firstName", { required: true })}
                                />
                                {errors.firstName && <span style={{ color: 'red' }}>Tr?????ng n??y kh??ng ???????c b??? tr???ng *</span>}


                            </div>
                            <div className="name__info item">
                                <label for="name">T??n</label>
                                <input type="text"
                                    {...register("lastName", { required: true })}
                                />
                                {errors.lastName && <span style={{ color: 'red' }}>Tr?????ng n??y kh??ng ???????c b??? tr???ng *</span>}
                            </div>
                            <div className="phone-number__info item">
                                <label for="phone-number">S??? ??i???n tho???i</label>

                                <input type="tel"
                                    {...register("phone", { required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ })}
                                />
                                {errors.phone?.type == "required" && <span style={{ color: 'red' }}>Tr?????ng n??y kh??ng ???????c b??? tr???ng *</span>}
                                {errors.phone?.type == "pattern" && <span style={{ color: 'red' }}>S??? ??i???n tho???i ch??a ????ng ?????nh d???ng *</span>}
                            </div>
                            <div className="mail__info">
                                <label for="phone-number">?????a ch??? Email</label>
                                <div id="bottom__content">
                                    <input type="email"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span style={{ color: 'red' }}>Tr?????ng n??y kh??ng ???????c b??? tr???ng *</span>}
                                    <span>Th??ng Tin S??? ???????c G???i Qua Email</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <p></p>
                    <div className="contact__info" style={{ marginTop: 150, marginBottom: 100 }}>
                        <h4 className="title">
                            Th???i gian
                        </h4>
                        <hr />
                        <div className="content">
                            <div className="name__info item">
                                <label for="name">T??? ng??y</label>
                                <input type="date"
                                    value={moment(checkinDate).format("YYYY-MM-DD")}
                                    onChange={e => setCheckinDate(e.target.value)}
                                    min={moment(new Date()).format("YYYY-MM-DD")}
                                />
                            </div>
                            <div className="phone-number__info item">
                                <label for="phone-number">?????n ng??y</label>
                                <input type="date"
                                    value={moment(checkoutDate).format("YYYY-MM-DD")}
                                    onChange={e => setCheckoutDate(e.target.value)}
                                    min={moment(checkinDate).format("YYYY-MM-DD")}
                                />
                            </div>

                        </div>
                    </div>
                    <br />
                    {/* <div className="bed__info">
                        <h4 className="title">
                            Th??ng tin gi?????ng ng???
                        </h4>
                        <hr />
                        <p className='bed__info--text'>
                            <span><FontAwesomeIcon icon={faBed} id="bed__icon" /></span>
                            M???t gi?????ng ????n v?? m???t gh??? t??nh y??u
                        </p>
                    </div>
                    <div className="name__order--info">
                        <h4 className="title">
                            T??n Ng?????i ?????t ch???
                        </h4>
                        <hr />
                        <div className="name__info item">
                            <label for="name">H??? t??n</label>
                            <input type="text" id="name" />
                        </div>
                        <hr />
                        <div className="more__request">
                            <label for="requested">Y??u c???u th??m <span>( t??y ch???n )</span></label>
                            <form action="" id="form-checkbox">
                                <input type="checkbox" id="request1" name="request1" value="Smoke" />
                                <label for="request1"> Ph??ng kh??ng h??t thu???c </label>
                                <br />
                                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                                <label for="vehicle2"> Y??u c???u ?????c bi???t ( y??u c???u nh???p chi ti???t )</label>
                            </form>
                            <textarea type="text" id="requested" />
                        </div>
                    </div> */}
                    {/* <div className="payment__method">
                        <h4 className="title">
                            H??nh th???c thanh to??n <span id="sm-text">( ch???n m???t trong hai h??nh th???c b??n d?????i )</span>
                        </h4>
                        <hr />
                        <form action="" id="form-checkbox__payment">
                            <div id="at__hotel">
                                <input type="checkbox" id="request1" name="request1" value="Smoke" />
                                <label for="request1"> Ph??ng kh??ng h??t thu???c </label>
                                <ul>
                                    <li id="text">Thanh to??n t???i kh??ch s???n s??? l?? thanh to??n tr???c ti???p b???ng ti???n m???t t???i kh??ch s???n.</li>
                                </ul>
                            </div>
                            <div id="by__banking">
                                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                                <label for="vehicle2"> Y??u c???u ?????c bi???t ( y??u c???u nh???p chi ti???t )</label>
                                <ul>
                                    <li id="text">
                                        Thanh to??n chuy???n kho???n tr?????c vui l??ng chuy???n kho???n nh?? sau : <br />
                                        S??? t??i kho???n: 12512516124 <br />
                                        Ch??? t??i kho???n: Ph???m H??ng <br />
                                        Viecombank chi nh??nh VVV <br />
                                        N???i dung: Thue Phong Khach San
                                    </li>
                                </ul>
                            </div>
                        </form>
                    </div> */}
                    <div className="rules">
                        <h4 className="title">
                            ??i???u kho???n v?? ??i???u ki???n ?????t ch???
                        </h4>
                        <hr />
                        <p className="text__rules">
                            B???ng c??ch ho??n th??nh vi???c ?????t ch??? n??y, b???n c???n ?????ng ?? v???i <span id="rules__booking-ticket">C??c ??i???u ki???n ?????t v??</span>, <span id="terms__condition">??i???u kho???n & ??i???u ki???n</span> v?? <span id="privacy__policy ">Ch??nh s??ch quy???n ri??ng t??</span>.
                        </p>
                    </div>
                    <div className="wrapper__booking--btn">
                        <button className="booking__btn" type="submit">


                            ?????T NGAY



                        </button>
                    </div>

                </form>

            </div>
        </>
    )
}