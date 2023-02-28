import moment from 'moment';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import API from '../../lib/API';
import '../../style/booking/booking-ticket.scss';
import { useForm } from "react-hook-form";

export default function BookingTicket() {
    let location = useLocation();
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    let [contact, setContact] = useState();
    let history = useHistory();
    let handleContact = (e) => {
        let { value, name } = e.target;
        setContact({
            ...contact,
            [name]: value
        })
    }
    let [date, setDate] = useState(new Date())
    console.log(location.state)
    let [data, setData] = useState({
        numberTicketChild: 0,
        numberTicketAdult: 1
    });
    const token = localStorage.getItem("token")
    let roleId = localStorage.getItem("roleId")
    let bookActivity = async (form) => {
        if (token) {
            if (roleId == 5) {
                let path = 'http://103.124.92.48:8888/qldv/activities/book';
                let resp = await API.authorizedJSONBOOKPost(path, {
                    activitiesCode: location.state,
                    contact: form,
                    travelDate: moment(date).format("YYYYMMDD"),
                    numberTicketChild: data?.numberTicketChild,
                    numberTicketAdult: data?.numberTicketAdult
                }, token)
                if (resp.ok) {
                    alert("Bạn đã book thành công!")
                    let response = await resp.json();
                    history.push({
                        pathname: '/booking-ticket-result',
                        state: response?.data?.id
                    })
                }
            }else{
                alert("Tài khoản này không phải tài khoản khách hàng, vui lòng tạo tài khoản user để có thể booking!")

            }
        } else {
            let message = window.confirm("Hãy đăng nhập ngay để trải nghiệm dịch vụ của chúng tôi");
            if (message) {
                history.push('/login')

            }
        }

    }
    return (
        <>
            <div className="wrapper__booking-tiket">
                {/* <div className="sign__up--text">
                    Hãy <span className="sign__up"
                        onClick={() => {
                            history.push('/register')
                        }}
                    >Đăng Ký</span> ngay nếu bạn chưa có tài khoản tại Travel Support!
                </div> */}
                <form className="content__booking"
                    onSubmit={handleSubmit(bookActivity)}
                >
                    <div className="info__booking--ticket">
                        <h4 className="title">
                            Thông tin đặt vé
                        </h4>
                        <hr />
                        <div className="row content">
                            <div className="col-4 time">
                                <div className="date item">
                                    <label for="booking__date">Ngày</label>
                                    <input id="booking__date" type="date"
                                        onChange={e => setDate(e.target.value)}
                                        value={moment(date).format("YYYY-MM-DD")}
                                        min={moment(new Date())?.format("YYYY-MM-DD")}
                                    />
                                </div>
                                {/* <div className="hour item">
                                    <label for="booking__hour">Giờ</label>
                                    <input id="booking__hour" type="time" />
                                </div> */}
                            </div>
                            <div className="col-4 amount__ticket">
                                <div className="adult__amount item">
                                    <label for="input__adult">Số vé người lớn</label>
                                    <input id="input__adult" type="number" min="1"
                                        onChange={e => setData({
                                            ...data,
                                            numberTicketAdult: e.target.value
                                        })}
                                        value={data?.numberTicketAdult}
                                    />
                                </div>
                                <div className="children__amount item">
                                    <label for="input__children">Số vé trẻ em</label>
                                    <input id="input__children" type="number" min="0"
                                        onChange={e => setData({
                                            ...data,
                                            numberTicketChild: e.target.value
                                        })}
                                        value={data?.numberTicketChild}
                                    />
                                </div>
                            </div>
                            <div className="col-4 attention">
                                <p>
                                    Chú ý:
                                    <br />
                                    Vé trẻ em chỉ áp dụng cho trẻ dưới 1m3
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="contact__info">
                        <h4 className="title">
                            Thông tin đặt vé
                        </h4>
                        <hr />

                        <div className="content">
                            <div className="name__info item">
                                <label for="name">Họ</label>
                                <input type="text"
                                    {...register("firstName", { required: true })}
                                />
                                {errors.firstName && <span style={{ color: 'red' }}>Trường này không được bỏ trống *</span>}


                            </div>
                            <div className="name__info item">
                                <label for="name">Tên</label>
                                <input type="text"
                                    {...register("lastName", { required: true })}
                                />
                                {errors.lastName && <span style={{ color: 'red' }}>Trường này không được bỏ trống *</span>}
                            </div>

                        </div>
                        <div className="content">
                            <div className="phone-number__info item">
                                <label for="phone-number">Số điện thoại</label>

                                <input type="tel"
                                    {...register("phone", { required: true, pattern: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/ })}
                                />
                                {errors.phone?.type == "required" && <span style={{ color: 'red' }}>Trường này không được bỏ trống *</span>}
                                {errors.phone?.type == "pattern" && <span style={{ color: 'red' }}>Số điện thoại chưa đúng định dạng *</span>}
                            </div>

                        </div>
                        <div className="content" style={{ marginBottom: 20 }}>
                            <div className="mail__info">
                                <label for="phone-number">Địa chỉ Email</label>
                                <div id="bottom__content">
                                    <input type="email"
                                        {...register("email", { required: true })}
                                    />
                                    {errors.email && <span style={{ color: 'red' }}>Trường này không được bỏ trống *</span>}
                                    <span>Thông Tin Sẽ Được Gửi Qua Email</span>
                                </div>
                            </div>
                        </div>

                        {/* <div className="more__request">
                            <label for="requested">Yêu cầu thêm <span>( tùy chọn )</span></label>
                            <textarea type="text" id="requested" />
                        </div> */}
                    </div>
                    <div className="rules" style={{ marginTop: 100 }}>
                        <h4 className="title">
                            Điều khoản và điều kiện đặt vé
                        </h4>
                        <hr />
                        <p className="text__rules">
                            Bằng cách hoàn thành việc đặt chỗ này, bạn cần đồng ý với <span id="rules__booking-ticket">Các điều kiện đặt vé</span>, <span id="terms__condition">Điều khoản & điều kiện</span> và <span id="privacy__policy ">Chính sách quyền riêng tư</span>.
                        </p>
                    </div>
                    <div className="wrapper__booking--btn">
                        <button className="booking__btn" type="submit">


                            ĐẶT NGAY



                        </button>
                    </div>

                </form>
            </div>
        </>
    )
}