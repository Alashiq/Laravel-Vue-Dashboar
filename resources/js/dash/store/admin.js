import router from '../routes.js'
export default {
    state: () => ({
        loadAuth: false,
        auth: false,
        user: {
            id: null,
            name: "",
            username: "",
            photo: ""
        },
        pageList: [
            {
                id: 1,
                name: "الرئيسية",
                active: true,
                path: "/admin",
                icon:'fas fa-home'
            },

            {
                id: 2,
                name: "الرسائل",
                active: false,
                path: "/admin/message",
                icon:'fas fa-comment-dots'
            },

            {
                id: 3,
                name: "المشرفين",
                active: false,
                path: "/admin/admin",
                icon:'fas fa-users'
            }
        ]
    }),

    mutations: {
        setUser(state, data) {
            state.user = data;
            state.auth = true;
        },
        authLoaded(state) {
            state.loadAuth = true;
        },
        clearUser(state){
            state.user={
                id: null,
                name: "",
                username: "",
                photo: ""
            };
            state.auth=false;
            state.loadAuth=false;
        },
        updateName(state,name){
            state.user.name=name;
        },
        activePage(state,pageNumber){
            for(var i=0;i<state.pageList.length;i++){
              if(state.pageList[i].id==pageNumber)
              state.pageList[i].active=true;
              else
              state.pageList[i].active=false;
            }
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
    }
};
