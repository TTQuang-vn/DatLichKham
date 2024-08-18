import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './DetailClinic.scss'
import HomeFooter from './../../HomePage/HomeFooter';
import HomeHeader from './../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetilClinictyById, getAllCodeService } from '../../../services/userService';
import _, { create } from 'lodash';
import { LANGUAGES } from '../../../utils/constant';
class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        }
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getDetilClinictyById({
                id: id,
            });

            if (res && res.errCode === 0) {
                let doctorClinic = res.doctorClinic
                let arrDoctorId = [];
                if (doctorClinic && !_.isEmpty(res.doctorClinic)) {
                    let arr = doctorClinic;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }
                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }

    }
    render() {
        let { arrDoctorId, dataDetailClinic, } = this.state
        let { language } = this.props
        console.log('check state', this.state)
        return (
            <div className='detail-clinic-container'>
                <HomeHeader />
                <div className='detail-clinic-body'>

                    <div className='description-clinic'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                            <>
                                <div className='clinic-content'>
                                    <div className='content-left' style={{ backgroundImage: `url(${dataDetailClinic.image})` }}>
                                    </div>
                                    <div className='content-right'>
                                        <div className='name-clinnic'>{dataDetailClinic.name}</div>
                                        <div className='address-clinic'>{dataDetailClinic.address}</div>
                                    </div>
                                </div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                            </>
                        }
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='each-doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            // dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
