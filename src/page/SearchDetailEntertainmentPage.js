import React from 'react';
import SearchEntainmentDetail from '../component/search-detail/SearchEntainmentDetail';
import SearchHotelDetail from '../component/search-detail/SearchHotelDetail';
import ExploreVN from '../component/share/ExploreVN';
import Footer from '../component/share/Footer';
import Header from '../component/share/Header';
import Rating from '../component/share/Rating';
import SearchPlace from '../component/share/SearchPlace';
import '../style/search-hotel-detail.scss';
import '../style/style.scss';

export default function SearchDetailEntertainmentPage() {
    return (
        <>
            <div className="wrapper__detail--page container" >
                <Header page={"entainment"} />
                {/* <div className="row row__search--btn">
                    <div className="col-2"></div>
                    <div className="col-5 col__search--btn">
                        <SearchPlace />
                    </div>
                </div> */}
                <div className="row row__search-page">

                    <div className="col-12 col__main">
                        <SearchEntainmentDetail />
                    </div>
                </div>
                {/* <div className="row row__rating">
                    <Rating />
                </div> */}
                <div className="row row__explore">
                    <ExploreVN />
                </div>
            </div>
            <Footer />
        </>
    )
}