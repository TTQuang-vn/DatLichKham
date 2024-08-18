import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import { LANGUAGES, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'

import './UserRedux.scss'
import TableManageUser from './TableManageUser';
class UserRedux extends Component {
    
    constructor(props) {
        super(props)
        this.state = {

            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL:'',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: '',
            userEditId: '',
        }
    }

    async componentDidMount () {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: this.props.genderRedux,
                gender: arrGender && arrGender.length >0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;

            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRole && arrRole.length >0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPosition && arrPosition.length >0 ? arrPosition[0].keyMap : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrRole = this.props.roleRedux;
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;


            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                position: arrPosition && arrPosition.length >0 ? arrPosition[0].keyMap : '',
                gender: arrGender && arrGender.length >0 ? arrGender[0].keyMap : '',
                role: arrRole && arrRole.length >0 ? arrRole[0].keyMap : '',
                avatar: '',
                previewImgURL: '',
                action: CRUD_ACTION.CREATE
            })
        }
    }

    handleOnchangeImage = async(event) => {
        let data = event.target.files;
        let file = data[0];
        if(file) {
            let base64 = await CommonUtils.getBase64(file);

            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
        
    }
    handleSaveUser = () => {
        let isValid = this.checkValidateinput();
        if (isValid === false) return;
        let {action} = this.state;
        if(action === CRUD_ACTION.CREATE) {
            // create user
            this.props.createNewUser({
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phoneNumber,
                password: this.state.password, 
                roleId: this.state.role,
                gender: this.state.gender,
                positionId: this.state.position,
                avatar: this.state.avatar,           
        })}
        if(action === CRUD_ACTION.EDIT) {
            // edit user
            this.props.editAUserRedus({
                id: this.state.userEditId,
                // email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phoneNumber,
                password: this.state.password, 
                roleId: this.state.role,
                gender: this.state.gender,
                positionId: this.state.position,
                avatar: this.state.avatar,  
            })
        }
    }

    checkValidateinput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++){ 
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('this input us required: '+arrCheck[i])
                break;
            }
        }
        
        return isValid 
    }

    onChangeInput = (event, id) =>{
        let copyState = {...this.state}

        copyState[id] =  event.target.value
        this.setState({
            ...copyState
        })
    }
    handleEditUserFromParent = (user) => { 
        let imageBase64 = '';
        if(user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phone,
            address: user.address,
            position: user.positionId,
            gender: user.gender,
            role: user.roleId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id
        })
    }

    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        let language = this.props.language;
        let {email, password, firstName, lastName, phoneNumber, address, gender, position, role, avatar} = this.state;
    //    let isGetGenders = this.props.isLoadingGender
        return (
            <div className='user-redux-container'>
                {/* <div>{isGetGenders === true ? 'Loding genders' : ''}</div> */}
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='title'><FormattedMessage id= "menu.admin.manage-user"/></div>
                        <div className='row'>
                            <div className='Col-12 my-3'><FormattedMessage id= "manage-user.add"/></div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.email"/></label>
                                <input className='form-control' type='email' value={email} onChange={(event) => {this.onChangeInput(event, 'email')}} disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.password"/></label>
                                <input className='form-control' type='password' value={password} onChange={(event) => {this.onChangeInput(event, 'password')}} disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.first-name"/></label>
                                <input className='form-control' type='text' value={firstName} onChange={(event) => {this.onChangeInput(event, 'firstName')}}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.last-name"/></label>
                                <input className='form-control' type='text' value={lastName} onChange={(event) => {this.onChangeInput(event, 'lastName')}}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.phone-number"/></label>
                                <input className='form-control' type='text' value={phoneNumber} onChange={(event) => {this.onChangeInput(event, 'phoneNumber')}}/>
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id= "manage-user.address"/></label>
                                <input className='form-control' type='text' value={address} onChange={(event) => {this.onChangeInput(event, 'address')}}/>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.gender"/></label>
                                <select className='form-control' value={gender} onChange={(event) => {this.onChangeInput(event, 'gender')}}>
                                    {genders && genders.length > 0 && 
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                    
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.position"/></label>
                                <select className='form-control' value={position} onChange={(event) => {this.onChangeInput(event, 'position')}}>
                                    {positions && positions.length > 0 && 
                                        positions.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.role"/></label>
                                <select className='form-control' value={role} onChange={(event) => {this.onChangeInput(event, 'role')}}>
                                    {roles && roles.length > 0 && 
                                        roles.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id= "manage-user.image"/></label>
                                <div className='preview-img-container'>
                                    <input id='previewImg' type='file' hidden onChange={(event) => this.handleOnchangeImage(event)}/>
                                    <label className='label-upload' htmlFor='previewImg'><FormattedMessage id= "manage-user.upload"/> <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{backgroundImage: `url(${this.state.previewImgURL})`}}></div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id= "manage-user.edit"/> : <FormattedMessage id= "manage-user.save"/>}
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        
        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),

        editAUserRedus: (data) => dispatch(actions.editAUser(data)),
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
