<template>
    <div class=" h-full w-full bg-blue-200 flex">
        <div class="h-96 w-96 mx-auto bg-white my-12 shadow-lg rounded px-4">
            <input
                class="h-10 w-full border my-12 rounded px-3 text-xl"
                v-model="formData.username"
                type="text"
                placeholder="اسم المستخدم"
            />
            <input
                class="h-10 w-full border my-12 rounded px-3 text-xl"
                v-model="formData.password"
                type="text"
                placeholder="كلمة المرور"
            />
{{auth}}
            <div class="w-40 h-12 bg-red-400 text-white rounded shadow-lg text-center" @click="login">تسجيل الدخول</div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            formData: {
                username: "",
                password: ""
            }
        };
    },
    methods: {
        login: function() {
            this.$store.dispatch("login", this.formData).then(
                response => {
                    //alert(response.message);
                   // Swal.fire("نجاح", response.message, "success");
                    this.$router.push("/admin");
                },
                error => {
                    if (error.status == 401) {
                        alert(error.message);
                       // Swal.fire("فشل", error.message, "warning");
                    } else if (error.status == 400) {
                        alert(error.message);
                        //Swal.fire("فشل", error.message, "warning");
                    } else
                        alert(error.message);
                    // Swal.fire("فشل", error.message, "warning");
                }
            );
        }
    },
    mounted() {},
    computed: {
        auth(){
            return this.$store.state.auth;
        }
    },
    created() {}
};
</script>
