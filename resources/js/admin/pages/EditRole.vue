<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <div
            class="w-full md:px-4 px-0 pb-8 pt-2 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium"
            v-if="loaded && role.length != 0"
        >
            <!-- Table Header -->
            <div
                class="h-16 w-full border-b mb-2 px-4 flex items-center text-lg justify-between"
            >
                بيانات الدور

                <router-link
                    to="/admin/role/"
                    class="btn-color-one text-white w-36 h-12 rounded shadow-1 font-normal flex items-center justify-center cursor-pointer"
                >
                    أدوار المشرفين
                </router-link>
            </div>
            <!-- End Table Header -->

            <!-- Item -->
            <div class="w-full px-4 py-4">
                <div class="h-9 flex items-center text-gray-500 mr-2 text-sm">
                    إسم الدور
                </div>
                <input
                    v-model="formData.name"
                    v-on:change="validateName"
                    class="h-12 w-full rounded border border-gray-200 bg-gray-50 flex items-center px-4 text-lg"
                />
                <div class="h-8 text-sm text-red-400 mr-2 flex items-center">
                    {{ formValidate.name }}
                </div>
            </div>
            <!-- Item -->

            <div class=" border-b mx-4 px-2 py-2 mt-6 text-gray-500 text-sm">
                الصلاحيات
            </div>

            <!-- Grid -->
            <div class="bg-blue-600a grid lg:grid-cols-2">
                <!-- Item -->
                <div
                    class="w-full mx-2 my-2 flex items-center"
                    v-for="(item, index) in role.permissions"
                    @click="togglePermission(index)"
                    :key="index"
                >
                    <div class="py-2 px-2 flex items-center">
                        <div
                            class="border rounded-xl h-9 w-9 flex items-center justify-center "
                        >
                            <div
                                v-if="item.state == true"
                                class="h-7 w-7 rounded-xl bg-green-500 text-white  flex items-center justify-center text-center"
                            >
                                <i class="fas fa-check"></i>
                            </div>
                        </div>
                        <div class="mr-2">{{ item.description }}</div>
                    </div>
                </div>
                <!-- End Item -->
            </div>
            <div class="h-8 text-sm text-red-400 mr-2 flex items-center px-3">
                {{ formValidate.permissions }}
            </div>
            <!-- Grid -->

            <!-- Btn Action -->
            <div class="w-full h-16 mt-12 flex items-center justify-start">
                <div
                    @click="editRole"
                    class="h-12 px-6 mx-4 bg-red-400 hover:bg-red-500 flex items-center justify-center text-white shadow-lg rounded cursor-pointer"
                >
                    <i class="fas fa-check ml-2"></i>
                    حفظ
                </div>
            </div>
            <!-- End Btn Action -->
        </div>

        <empty-box
            v-if="loaded && role.length == 0"
            message="لا يوجد دور بهذا الرقم"
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
            role: [],
            formData: {
                name: "",
                permissions: []
            },
            formValidate: {
                name: "",
                permissions: ""
            },
            loaded: false
        };
    },
    methods: {
        togglePermission(index) {
            this.role.permissions[index].state = !this.role.permissions[index]
                .state;
        },
        editRole: function() {
            this.formData.permissions = [];

            for (var i = 0; i < this.role.permissions.length; i++) {
                if (this.role.permissions[i].state == true)
                    this.formData.permissions.push(
                        this.role.permissions[i].name
                    );
            }

            this.validateName();
            this.validatePermissions();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.permissions != "") return 0;

        this.$loading.Start();
        this.$http
            .UpdateRole(this.$route.params.id, this.formData)
            .then(response => {
                this.$loading.Stop();
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا الدور غير موجود");
                }
            })
            .catch(error => {
                this.$loading.Stop();
                this.$alert.BadRequest(error.response);
            });
        },
        validateName: function() {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length < 5) {
                this.formValidate.name = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 16) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 16 حرف";
                return 1;
            }
        },
        validatePermissions: function() {
            this.formValidate.permissions = "";
            if (this.formData.permissions.length == 0) {
                this.formValidate.permissions =
                    "يجب عليك اختيار صلاحية واحدة على الأقل";
                return 1;
            }
        }
    },
    mounted() {
        this.$store.commit("activePage", 4);

        this.$loading.Start();
        this.$http
            .GetRoleById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.role = response.data.role;
                    this.formData.name = this.role.name;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا الدور غير موجود");
                }
            })
            .catch(error => {
                this.$loading.Stop();
                this.loaded = true;
                this.$alert.BadRequest(error.response);
            });
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
