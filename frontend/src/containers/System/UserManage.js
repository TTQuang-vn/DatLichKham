import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
// import { emitter } from '../../utils/emitter';
import { connect } from 'react-redux';
import { getAllUsersApi, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import './UserManage.scss';
// import ModalUser from './ModalUser';
// import ModalEditUser from './ModalEditUser';
import Header from '../Header/Header';
import { toast } from 'react-toastify';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {},
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();

    }
    getAllUsersFromReact = async () => {
        let response = await getAllUsersApi('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })

        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    // toggleUserModal =() => {
    //     this.setState({
    //         isOpenModalUser: !this.state.isOpenModalUser,
    //     })
    // }
    // toggleEditUserModal = () =>{
    //     this.setState({
    //         isOpenModalEditUser: !this.state.isOpenModalEditUser
    //     })
    // }

    // createNewUser = async(data) =>{
    //     try{
    //         let response = await createNewUserService(data)
    //         if(response && response.errCode !==0 ){

    //         }else{
    //             await this.getAllUsersFromReact()
    //             this.setState({
    //                 isOpenModalUser: false
    //             })
    //             emitter.emit('EVENT_CLEAR_MODAL_DATA')
    //         }
    //     }catch(e){
    //         console.log(e)
    //     }

    // }
    // handleDeleteUser = async (user) =>{
    //     try{
    //         let response = await deleteUserService(user.id)
    //         if(response && response.errCode ===0 ){
    //             await this.getAllUsersFromReact()
    //             toast.success("Xóa người dùng thành công")
    //         }else{
    //             alert(response.errMessage)
    //         }
    //         console.log(response)
    //     }catch(e){
    //         console.log(e)
    //     }
    // }
    // handleEditUser = (user) =>{
    //     this.setState({
    //         isOpenModalEditUser: true,
    //         userEdit: user
    //     })
    // }
    // doEditUser = async(user) =>{
    //     try{
    //         let response = await editUserService(user)
    //         if(response&&response.errCode === 0){
    //             this.setState({
    //                 isOpenModalEditUser: false
    //             })
    //             await this.getAllUsersFromReact()
    //         }else{
    //             alert(response.errCode)
    //         }
    //     }catch(e){
    //         console.log(e)
    //     }
    // }

    render() {

        let arrUsers = this.state.arrUsers;
        return (
            <div className="users-container">
                {/* <ModalUser
                    isOpen = {this.state.isOpenModalUser}
                    toggleFromParent = {this.toggleUserModal}
                    createNewUser = {this.createNewUser}
                />
                {this.state.isOpenModalEditUser&&<ModalEditUser
                    isOpen = {this.state.isOpenModalEditUser}
                    toggleFromParent = {this.toggleEditUserModal}
                    currenUser = {this.state.userEdit}
                    editUser = {this.doEditUser}
                
                />} */}
                <div className='title text-center'>Quản Lý Người Dùng</div>


                <div className='users-tatble mt-4 mx-4'>
                    <div className='btn-btn'>
                        <button className='btn-btn-primary px-5'
                            onClick={() => this.handleAddNewUser()}
                        ><i className="fas fa-user-plus"></i></button>
                    </div>
                    <table id="customers">
                        <tr>
                            <th>Email</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Địa chỉ</th>
                            <th>Giới tính</th>
                            <th>Tính năng</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                        <div className='btn123123'>
                                            <div className='edit'><button className='btn-edit mx-1' onClick={() => this.handleEditUser(item)}> <i className="fas fa-pencil-alt"></i></button></div>
                                            <div className='delete'><button className='btn-delete mx-1' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button></div>
                                        </div>

                                    </td>
                                </tr>
                            )
                        })
                        }
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
