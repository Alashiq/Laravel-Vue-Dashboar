export default {
    state: () => ({
        loadAuth: false,
        auth: false,
        user: {
            id: null,
            name: "",
            username: "",
            photo: "",
            role:""
        },
        permissions: [],
        pageList: [
            {
                id: 1,
                name: "الرئيسية",
                role: "HomeChart",
                active: true,
                path: "/admin",
                icon: "fas fa-home"
            },

            {
                id: 2,
                name: "الرسائل",
                role: "ReadMessage",
                active: false,
                path: "/admin/message",
                icon: "fas fa-comment-dots"
            },

            {
                id: 3,
                name: "المشرفين",
                role: "ReadAdmin",
                active: false,
                path: "/admin/admin",
                icon: "fas fa-users"
            },
            {
                id: 4,
                name: "أدوار المشرفين",
                role: "ReadRole",
                active: false,
                path: "/admin/role",
                icon: "fas fa-user-shield"
            }
        ],
        menu: false,
        loading:false
    }),

    mutations: {
        setUser(state, data) {
            state.user = data;
            state.auth = true;
        },
        setPermissions(state, data) {
            state.permissions = data;
        },
        authLoaded(state) {
            state.loadAuth = true;
        },
        clearUser(state) {
            state.user = {
                id: null,
                name: "",
                username: "",
                photo: ""
            };
            state.auth = false;
            state.loadAuth = false;
        },
        updateName(state, name) {
            state.user.name = name;
        },
        updatePhoto(state, photo) {
            state.user.photo = photo;
        },
        activePage(state, pageNumber) {
            for (var i = 0; i < state.pageList.length; i++) {
                if (state.pageList[i].id == pageNumber)
                    state.pageList[i].active = true;
                else state.pageList[i].active = false;
            }
        },
        toggleMenu(state) {
            state.menu = !state.menu;
        },
        loadingStart(state) {
            state.loading = true;
        },
        loadingStop(state) {
            state.loading = false;
        },
    },

    actions: {
        //  Login
        async login({ commit }, loginData) {
            return new Promise((resolve, reject) => {
                axios.post("/api/admin/login", loginData).then(
                    response => {
                        localStorage.setItem("token", response.data.user.token);
                        axios.defaults.headers.common["Authorization"] =
                            "Bearer " + response.data.user.token;
                        this.commit("setUser", response.data.user);
                        this.commit("setPermissions", response.data.permissions);
                        this.commit("authLoaded");
                        resolve({
                            message: "تم تسجيل الدخول بنجاح",
                            status: response.status
                        });
                    },
                    error => {
                        console.log(error.response);
                        if (error.response.status == 401)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        if (error.response.status == 400)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        reject({
                            message: "حدث خطأ ما",
                            status: error.response.status
                        });
                        this.commit("authLoaded");
                    }
                );
            });
        },
        //  Check Auth
        async checkAuth({ commit }) {
            axios.defaults.headers.common["Authorization"] =
                "Bearer " + localStorage.getItem("token");
            return new Promise((resolve, reject) => {
                axios.get("/api/admin/auth").then(
                    response => {
                        this.commit("setUser", response.data.user);
                        this.commit("setPermissions", response.data.permissions);
                        resolve({
                            message: "مرحبا بالمستخدم",
                            status: response.status
                        });
                    },
                    error => {
                        if (error.response.status == 401)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        if (error.response.status == 400)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        reject({
                            message: "حدث خطأ ما",
                            status: error.response.status
                        });
                    }
                );
            });
        },
        //  Logout
        async logout({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get("/api/admin/logout").then(
                    response => {
                        resolve({
                            message: "تم تسجيل الخروج بنجاح",
                            status: response.status
                        });
                    },
                    error => {
                        console.log(error.response);
                        if (error.response.status == 401)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        if (error.response.status == 400)
                            reject({
                                message: error.response.data.message,
                                status: error.response.status
                            });
                        reject({
                            message: "حدث خطأ ما",
                            status: error.response.status
                        });
                    }
                );
            });
        },
        // If 401 Error
        async clearAuth({ commit }) {
            this.commit("clearUser");
        },

    }
};
