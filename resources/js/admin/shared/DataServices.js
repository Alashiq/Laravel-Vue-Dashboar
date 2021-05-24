import axios from "axios";
export default {
    // ============== Auth Part =======================

    // ============== Home Part =======================
    GetHome() {
        return axios.get("/api/admin/home");
    },

    // ============== Message Part =======================
    GetAllMessages() {
        return axios.get("/api/admin/message");
    },
    DeleteMessage(message) {
        return axios.delete("/api/admin/message/" + message);
    },
    SloveMessage(message) {
        return axios.put("/api/admin/message/" + message);
    },
    GetMessageById(message) {
        return axios.get("/api/admin/message/"+ message);
    },
    // ============== Admin Part =======================
    GetAdmins() {
        return axios.get("/api/admin/admin");
    },
    ActiveAdmin(admin) {
        return axios.put("/api/admin/admin/" + admin + "/active");
    },
    DisActiveAdmin(admin) {
        return axios.put("/api/admin/admin/" + admin + "/disActive");
    },
    BannedAdmin(admin) {
        return axios.put("/api/admin/admin/" + admin + "/banned");
    },
    ResetAdminPassword(admin) {
        return axios.put("/api/admin/admin/" + admin + "/reset");
    },
    GetAdminById(admin) {
        return axios.get("/api/admin/admin/"+ admin);
    },
    

    // ============== Role Part =======================
};
