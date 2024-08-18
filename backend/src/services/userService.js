import db from "../models/index.js";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
// bam mat khau 
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt); // Thay 'password' bằng biến 'password'
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    });
}
//login
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'positionId', 'id', 'lastname', 'firstname', 'address', 'phone'],
                    where: { email: email },

                    raw: true
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)//passwoed tham so truyen , user.password check tu data
                    if (check) {
                        userData.errCode = 0;
                        // userData.message = "Đăng nhập thành công";
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = "Mật khẩu không đúng !";
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'Email đã bị xóa !'
                }

            } else {
                userData.errCode = 1;
                userData.message = 'Email không tồn tại !';

            }
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (e) {
            reject(e);
        }
    })
}

//lay user
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

//tao user
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //checkemail
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'email đã tồn tại',
                })
            } else {
                let hashedPassword = await hashUserPassword(data.password);

                await db.User.create({
                    email: data.email,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phone: data.phone,
                    password: hashedPassword, // Sử dụng mật khẩu đã được băm
                    roleId: data.roleId,
                    gender: data.gender,
                    positionId: data.positionId,
                    image: data.avatar,
                });
                resolve({
                    errCode: 0,
                    errMessage: 'OK',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
//xoa user
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: "Tài khoản không tồn tại"
            })
        }
        await db.User.destroy({
            where: { id: userId }
        });
        resolve({
            errCode: 0,
            errMessage: "Tài khoản đã bị xóa"
        })
    })
}
//edit user
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender || !data.positionId) {
                resolve({
                    errCode: 2,
                    errMessage: "Không tìm thấy tài khoản"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                // user.email = data.email,
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phone = data.phone;
                user.roleId = data.roleId;
                user.gender = data.gender;
                user.positionId = data.positionId;
                if (data.avatar) {
                    user.image = data.avatar;
                }


                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Tài khoản đã được cập nhật"
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Tài khoản không tòn tại"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
//get allcode
let getAllCodeServiece = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Không tìm thấy loại dữ liệu',
                })
            } else {
                let res = {};
                let allcode = await db.Allcodes.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    hashUserPassword: hashUserPassword,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodeServiece: getAllCodeServiece,

}