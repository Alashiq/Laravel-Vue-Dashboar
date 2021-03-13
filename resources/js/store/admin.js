export default {
    state: () => ({
        loadAuth: false,
        auth: false,
        user: {
            id: null,
            name: "",
            username: "",
            photo: "",
            token: ""
        }
    }),

    mutations: {
        setUser(state, data) {
            state.user = data;
            state.auth = true;
            state.loadAuth = false;
        }
    },

    actions: {
        //  Login
        async login({ commit }, loginData) {
            return new Promise((resolve, reject) => {
                axios.post("/api/admin/login", loginData).then(
                    response => {
                        console.log(response.data);
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
        }
    }
};
