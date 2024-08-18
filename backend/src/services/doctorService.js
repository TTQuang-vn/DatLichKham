import { where } from "sequelize";
import db from "../models/index.js";
require('dotenv').config();
import _, { reject } from 'lodash';
import { raw } from "body-parser";
import emailService from "./emailService.js";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}
let getAllDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                },
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
let checkRequiredFields = (inputData) => {
    let arrFields = ['doctorId', 'contentHTML', 'contentMarkdown',
        'action', 'selectedPrice',
        'selectedPayment', 'selectedProvince', 'nameClinic',
        'addressClinic', 'note', 'specialtyId'
    ]
    let isValid = true;
    let element = '';
    for (let i = 0; i < arrFields.length; i++) {
        if (!inputData[arrFields[i]]) {
            isValid = false;
            element = arrFields[i]
            break;
        }
    }
    return {
        isValid: isValid,
        element: element
    }
}
let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkObj = checkRequiredFields(inputData);
            if (checkObj.isValid === false) {
                resolve({
                    errCode: 1,
                    errMessage: `Missing parameter: ${checkObj.element}`
                })
            } else {
                if (inputData.action === 'CREATE') {
                    await db.markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                } else if (inputData.action === 'EDIT') {
                    let doctorMackdown = await db.markdown.findOne({
                        where: { doctorId: inputData.doctorId },
                        raw: false
                    })

                    if (doctorMackdown) {
                        doctorMackdown.contentHTML = inputData.contentHTML,
                            doctorMackdown.contentMarkdown = inputData.contentMarkdown,
                            doctorMackdown.description = inputData.description, doctorMackdown,
                            doctorMackdown.updateAt = new Date();
                        await doctorMackdown.save()
                    }
                }
            }
            let doctorInfor = await db.doctor.findOne({
                where: {
                    doctorId: inputData.doctorId,

                },
                raw: false
            })
            if (doctorInfor) {
                //update
                doctorInfor.doctorId = inputData.doctorId,
                    doctorInfor.priceId = inputData.selectedPrice,
                    doctorInfor.provinceId = inputData.selectedProvince,
                    doctorInfor.paymentId = inputData.selectedPayment,
                    doctorInfor.addressClinic = inputData.addressClinic,
                    doctorInfor.nameClinic = inputData.nameClinic,
                    doctorInfor.note = inputData.note,
                    doctorInfor.specialtyId = inputData.specialtyId,
                    doctorInfor.clinicId = inputData.clinicId,
                    await doctorInfor.save()
            } else {
                //create
                await db.doctor.create({
                    doctorId: inputData.doctorId,
                    priceId: inputData.selectedPrice,
                    provinceId: inputData.selectedProvince,
                    mentId: inputData.selectedPayment,
                    addressClinic: inputData.addressClinic,
                    nameClinic: inputData.nameClinic,
                    note: inputData.note,
                    specialtyId: inputData.specialtyId,
                    clinicId: inputData.clinicId,
                })
            }
            resolve({
                errCode: 0,
                errMessage: 'Save infor doctor succeed !'
            })
        } catch (e) {
            reject(e)
        }

    })
}
let getDetailDoctorById = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password',]
                    },
                    include: [
                        {
                            model: db.markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'], },

                        {
                            model: db.doctor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'], },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'], },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'], },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })

}
let bulkCreateSchedule = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.arrSchedule || !data.doctorId || !data.formatedDate) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let schedule = data.arrSchedule;
                if (schedule && schedule.length > 0) {
                    schedule = schedule.map(item => {
                        item.maxNumber = MAX_NUMBER_SCHEDULE;
                        return item;
                    })
                }
                let existing = await db.schedule.findAll({
                    where: { doctorId: data.doctorId, date: data.formatedDate },
                    attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                    raw: true
                })

                let toCreate = _.differenceWith(schedule, existing, (a, b) => {
                    return a.timeType === b.timeType && +a.date === +b.date;
                });


                if (toCreate && toCreate.length > 0) {
                    await db.schedule.bulkCreate(toCreate)
                }

                resolve({
                    errCode: 0,
                    errMessage: 'OK'
                })
            }

        } catch (e) {
            reject(e);
        }
    })
}
let getScheduleByDate = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let dataSchedule = await db.schedule.findAll({
                    where: {
                        doctorId: doctorId,
                        date: date
                    },
                    include: [
                        { model: db.Allcodes, as: 'timeTypeData', attributes: ['valueEn', 'valueVi'], },
                        { model: db.User, as: 'doctorData', attributes: ['firstName', 'lastName'], },
                    ],
                    raw: false,
                    nest: true
                })
                if (!dataSchedule) dataSchedule: [];
                resolve({
                    errCode: 0,
                    data: dataSchedule
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getExtraInforDoctorbyId = (idInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!idInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.doctor.findOne({
                    where: {
                        doctorId: idInput
                    },
                    attributes: {
                        exclude: ['id', 'doctorId'],
                    },
                    include: [
                        { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'], },
                        { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'], },
                        { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'], },
                    ],
                    raw: false,
                    nest: true
                })
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getProfileDoctorbyId = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: {
                        id: inputId
                    },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        {
                            model: db.markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown'],
                        },
                        { model: db.Allcodes, as: 'positionData', attributes: ['valueEn', 'valueVi'], },

                        {
                            model: db.doctor,
                            attributes: {
                                exclude: ['id', 'doctorId'],
                            },
                            include: [
                                { model: db.Allcodes, as: 'priceTypeData', attributes: ['valueEn', 'valueVi'], },
                                { model: db.Allcodes, as: 'provinceTypeData', attributes: ['valueEn', 'valueVi'], },
                                { model: db.Allcodes, as: 'paymentTypeData', attributes: ['valueEn', 'valueVi'], },
                            ]
                        },

                    ],
                    raw: false,
                    nest: true
                })
                if (data && data.image) {
                    data.image = new Buffer(data.image, 'base64').toString('binary');
                }
                if (!data) data = {};
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getListPatientForDoctor = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId || !date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                let data = await db.booking.findAll({
                    where: {
                        statusId: 'S2',
                        doctorId: doctorId,
                        date: date,
                    },
                    include: [
                        {
                            model: db.User, as: 'patientData',
                            attributes: ['firstName', 'email', 'address', 'gender'],
                            include: [
                                { model: db.Allcodes, as: 'genderData', attributes: ['valueEn', 'valueVi'], },
                            ]
                        },
                        { model: db.Allcodes, as: 'timeTypeDataPatient', attributes: ['valueEn', 'valueVi'], },
                    ],
                    raw: false,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let sendRemedy = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.patientId || !data.timeType) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter!'
                })
            } else {
                //update paient status
                let appointment = await db.booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        patientId: data.patientId,
                        timeType: data.timeType,
                        statusId: 'S2',
                    },
                    raw: false
                })

                if (appointment) {
                    appointment.statusId = 'S3'
                    await appointment.save()
                }
                //send email remedy
                await emailService.sendAttachment(data)
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailDoctorById: getDetailDoctorById,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDate: getScheduleByDate,
    getExtraInforDoctorbyId: getExtraInforDoctorbyId,
    getProfileDoctorbyId: getProfileDoctorbyId,
    getListPatientForDoctor: getListPatientForDoctor,
    sendRemedy: sendRemedy,
}