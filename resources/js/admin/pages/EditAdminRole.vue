<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
            v-if="loaded && admin.length != 0"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                تعديل دور المشرف

                <router-link
                    to="/admin/admin/"
                    class="btn-color-one text-white w-36 h-12 rounded shadow-1 font-normal flex items-center justify-center cursor-pointer"
                >
                    قائمة المشرفين
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Admin Photo -->
            <div class="w-full px-4 py-4">
                <img
                    :src="admin.photo"
                    class="h-48 w-48 mx-auto rounded-full"
                />
            </div>
            <!-- Admin Photo -->

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-2 md:grid-cols-2">
                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        إسم المشرف
                    </div>
                    <div
                        class="h-12 rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                    >
                        {{ admin.name }}
                    </div>
                </div>
                <!-- Item -->

                <!-- Item -->
                <div class="w-full px-4 py-4">
                    <div
                        class="h-9 flex items-center text-gray-500 mr-2 text-sm"
                    >
                        دور المشرف
                    </div>
                    <!-- {{roles}} -->
                    <select
                        class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                        v-model="admin.role_id"
                    >
                        <option
                            v-for="(item, index) in roles"
                            :key="index"
                            :value="item.id"
                            >{{ item.name }}</option
                        >
                    </select>
                </div>
                <!-- Item -->
            </div>
            <!-- Grid -->

            <!-- Btn Action -->
            <div
                class="w-full lg:h-20 mt-12 lg:flex items-center justify-start"
            >
                <div
                    @click="updateAdminRole"
                    class="h-12 px-6 mx-4 bg-red-400 hover:bg-red-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-check ml-2"></i>
                    حفظ
                </div>
            </div>
            <!-- End Btn Action -->
        </div>

        <empty-box
            v-if="loaded && admin.length == 0"
            message="لا يوجد مشرف بهذا الرقم"
        ></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import { clearLogout } from "../logout.js";
import Swal from "sweetalert2";
export default {
    data() {
        return {
            admin: [],
            roles: [],
            loaded: false
        };
    },
    methods: {
        updateAdminRole: function() {
            Swal.mixin({ allowOutsideClick: false }).showLoading();
            axios
                .put("/api/admin/admin/" + this.$route.params.id + "/role", {
                    role_id: this.admin.role_id
                })
                .then(
                    response => {
                        if (response.status == 200) {
                            this.admin.state = 1;
                            Swal.fire("نجاح", response.data.message, "success");
                        }
                    },
                    error => {
                        clearLogout(this.$store, this.$router, error.response);
                    }
                );
        }
    },
    mounted() {
        this.$store.commit("activePage", 3);

        Swal.mixin({ allowOutsideClick: false }).showLoading();
        axios.get("/api/admin/admin/" + this.$route.params.id).then(
            response => {
                this.loaded = true;
                if (response.status == 200) {
                    this.admin = response.data.data;
                    this.roles = response.data.roles;
                    Swal.mixin({
                        position: "bottom-start",
                        timer: 3000,
                        toast: true,
                        showConfirmButton: false
                    }).fire("نجاح", response.data.message, "success");
                } else if (response.status == 204) {
                    Swal.mixin({
                        position: "bottom-start",
                        timer: 3000,
                        toast: true,
                        showConfirmButton: false
                    }).fire("تنبيه", "هذه الرسالة غير متوفرة", "warning");
                }
            },
            error => {
                this.loaded = true;
                clearLogout(this.$store, this.$router, error.response);
            }
        );
    },
    computed: {},
    created() {}
};
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 1em;
}
</style>
