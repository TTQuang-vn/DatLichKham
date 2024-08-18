import express from "express";

import doctorcontroller from "../controllers/doctorcontroller"
import usercontroller from "../controllers/usercontroller";
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
let router = express.Router();
let initWebroutes = (app) => {

    //user
    router.post('/api/Login', usercontroller.handleLogin);
    router.get('/api/get-all-users', usercontroller.handleGetAllUser)
    router.post('/api/create-new-user', usercontroller.handleCreateNewUser)
    router.put('/api/edit-user', usercontroller.handleEditUser)
    router.delete('/api/delete-user', usercontroller.handleDeleteUser)
    router.get('/api/allcode', usercontroller.getAllCode)

    //doctor
    router.get('/api/top-doctor-home', doctorcontroller.getTopDoctorHome)
    router.get('/api/get-all-doctors', doctorcontroller.getAllDoctors)
    router.post('/api/save-info-doctors', doctorcontroller.postInforDoctor)
    router.get('/api/get-detail-doctor-by-id', doctorcontroller.getDetailDoctorById)
    router.post('/api/bulk-create-schedule', doctorcontroller.bulkCreateSchedule)
    router.get('/api/get-schedule-doctor-by-date', doctorcontroller.getScheduleByDate)
    router.get('/api/get-extra-infor-doctor-by-id', doctorcontroller.getExtraInforDoctorbyId)
    router.get('/api/get-profile-doctor-by-id', doctorcontroller.getProfileDoctorbyId)

    //doctor vs patient
    router.get('/api/get-list-patient-for-doctor', doctorcontroller.getListPatientForDoctor)
    router.post('/api/send-remedy', doctorcontroller.sendRemedy)

    //booking
    router.post('/api/patient-book-appointment', patientController.postBookAppointment)
    router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment)

    //specialty
    router.post('/api/create-new-specialty', specialtyController.createSpecialty)
    router.get('/api/get-specialty', specialtyController.getAllSpecialty)
    router.get('/api/get-detail-specialty-by-id', specialtyController.getDetilSpecialtyById)

    //clinic
    router.post('/api/create-new-clinic', clinicController.createClinic)
    router.get('/api/get-clinic', clinicController.getAllClinic)
    router.get('/api/get-detail-clinic-by-id', clinicController.getDetilClinictyById)

    //patient

    return app.use("/", router);
}
module.exports = initWebroutes  