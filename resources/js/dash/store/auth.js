export default {
  namespaced: true,

  state: {
    sidemenu:true,
    loadAuth: false,
    auth: false,
    user: {
        id: null,
        name: "",
        username: "",
        photo: ""
    },
},

mutations: {
    setUser(state, data) {
        state.user = data;
        state.auth = true;
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
    toggleMenu(state){
        state.menu=!state.menu;
    }
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
        }
  },



};