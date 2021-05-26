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
    GetAllAdmins() {
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
        return axios.get("/api/admin/admin/" + admin);
    },
    GetAdminRolesForNewAdmin() {
        return axios.get("/api/admin/admin/role");
    },
    PostNewAdmin(admin) {
        return axios.post("/api/admin/admin/", admin);
    },
    UpdateAdminRole(admin,formData) {
        return axios.put("/api/admin/admin/" + admin + "/role",formData);
    },
    

    // ============== Role Part =======================
    GetAllRoles() {
        return axios.get("/api/admin/role");
    },
    GetRoleById(role) {
        return axios.get("/api/admin/role/"+ role);
    },
    DeleteRole(role) {
        return axios.delete("/api/admin/role/" + role);
    },
    GetAllPermissionsForNewRole() {
        return axios.get("/api/admin/role/permissions");
    },
    PostNewRole(role) {
        return axios.post("/api/admin/role", role);
    },
    UpdateRole(role,formData) {
        return axios.put("/api/admin/role/" + role,formData);
    },

};
