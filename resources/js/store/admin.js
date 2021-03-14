export default {
    state: () => ({
        loadAuth: false,
        auth: false,
        user: {
            id: null,
            name: "",
            username: "",
            photo: ""
        }
    }),

    mutations: {
        setUser(state, data) {
            state.user = data;
            state.auth = true;
        },
        authLoaded(state) {
            state.loadAuth = true;
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
        }
    }
};
