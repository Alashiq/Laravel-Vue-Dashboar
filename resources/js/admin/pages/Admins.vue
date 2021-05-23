<template>
    <div class="w-auto md:p-8 p-4">
        <!-- Inside Page -->

        <!-- List Header -->

        <div class="flex justify-between w-full h-16 items-center">
            <div class="text-2xl font-semibold cairo text-gray-600">
                مشرفي الموقع
            </div>
            <router-link
            v-show="$parent.checkPermission('CreateAdmin') == true"
                to="/admin/admin/new"
                class="rounded px-4 flex items-center cairo font-medium add-btn"
            >
                <span class="h-12 flex items-center">
                    <i class="fas fa-plus ml-4 text-lg"></i>
                    أضف مشرف
                </span>
            </router-link>
        </div>

        <div class="flex justify-between my-8">
            <!-- Filter -->
            <div
                class="border rounded font-semibold cairo flex bg-center text-gray-700"
            >
                <div
                    v-for="(item, index) in filter"
                    :key="index"
                    :class="{
                        'h-12 px-4 flex cursor-pointer items-center ': 1 == 1,
                        'bg-white ': item.link == activeFilter,
                        'rounded-r ': index == 0,
                        ' rounded-l border-l-0 ': index == filter.length - 1,
                        'border-l ': index != filter.length - 1
                    }"
                    @click="changeFilter(item.link)"
                >
                    {{ item.name }}
                </div>
            </div>
            <!-- End felter -->
        </div>
        <!-- End List Header -->

        <table class="w-full" v-if="loaded && filterAdmin.length != 0">
            <tr class="h-12 text-lg font-bold text-gray-600">
                <td class="w-12 text-center">#</td>
                <td class="sm:table-cell hidden">الصورة</td>
                <td class="lg:table-cell hidden">الإسم</td>
                <td class="">إسم الدخول</td>
                <td class="xl:table-cell hidden">الحالة</td>
                <td class="xl:table-cell hidden">تاريخ الإنشاء</td>
                <td class="rounded-l-lg">الإجراءات</td>
            </tr>

            <tr
                v-for="(item, index) in filterAdmin"
                :key="index"
                class="h-24 bg-white shadow-2 rounded-lg text-lg text-gray-600 font-medium  hover:bg-gray-50"
            >
                <td class="w-12 text-center rounded-r-lg">{{ item.id }}</td>
                <td class=" sm:table-cell hidden">
                    <img :src="item.photo" class="h-16 w-16" alt="" />
                </td>
                <td class="lg:table-cell hidden">
                    {{ item.name.substring(0, 10) }}
                </td>
                <td>{{ item.username }}</td>
                <td class="xl:table-cell hidden">
                    <div
                        v-if="item.state == 1"
                        class="bg-green-400 flex items-center justify-center rounded shadow h-10 w-24 text-white text-base"
                    >
                        نشط
                    </div>
                    <div
                        v-else-if="item.state == 0"
                        class="bg-yellow-400 flex items-center justify-center rounded shadow h-10 w-24 text-white text-base"
                    >
                        غير نشط
                    </div>
                    <div
                        v-else
                        class="bg-red-500 flex items-center justify-center rounded shadow h-10 w-24 text-white text-base"
                    >
                        محظور
                    </div>
                </td>
                <td class="xl:table-cell hidden">
                    {{ item.created_at.substring(0, 10) }}
                </td>
                <td class=" rounded-l-lg h-20">
                    <router-link :to="'/admin/admin/' + item.id">
                        <i
                            title="عرض بيانات المشرف"
                            class="fas fa-eye px-4 py-2 see-btn rounded ml-2"
                        ></i>
                    </router-link>

                    <i
                    v-show="$parent.checkPermission('BannedAdmin') == true"
                        title="حظر المشرف"
                        v-if="item.state != 2"
                        @click="bannedAdmin(item.id, index)"
                        class="fas fa-user-slash px-4 py-2 delete-btn rounded ml-2"
                    ></i>
                    <i
                    v-show="$parent.checkPermission('ActiveAdmin') == true"
                        title="تفعيل المشرف"
                        @click="activeAdmin(item.id, index)"
                        v-if="item.state == 0"
                        class="fas fa-lock-open px-4 py-2 cursor-pointer bg-green-400 hover:bg-green-500 shadow-one text-white rounded ml-2"
                    ></i>
                    <i
                    v-show="$parent.checkPermission('DisActiveAdmin') == true"
                        title="إلغاء تفعيل المشرف"
                        @click="disActiveAdmin(item.id, index)"
                        v-else-if="item.state == 1"
                        class="fas fa-lock px-4 py-2 cursor-pointer bg-yellow-400 hover:bg-yellow-500 shadow-one text-white rounded ml-2"
                    ></i>

                    <router-link :to="'/admin/admin/' + item.id + '/edit'">
                        <i
                    v-show="$parent.checkPermission('EditRoleAdmin') == true"
                            title="تعديل دور ا لمشرف"
                            class="fas fa-user-shield  px-4 py-2 cursor-pointer bg-green-400 hover:bg-green-500 shadow-one text-white rounded"
                        ></i>
                    </router-link>
                </td>
            </tr>
        </table>

        <empty-box v-if="loaded && filterAdmin.length == 0"></empty-box>

        <!-- End Inside Page -->
    </div>
</template>

<script>
import Swal from "sweetalert2";
import { clearLogout } from "../logout.js";
export default {
    data() {
        return {
            admins: [],
            loaded: false,
            filter: [
                {
                    link: "all",
                    name: "الكل",
                    active: true
                },
                {
                    link: "active",
                    name: "المفعلين",
                    active: false
                },
                {
                    link: "notActive",
                    name: "الغير مفعل",
                    active: true
                },
                {
                    link: "banned",
                    name: "المحظورين",
                    active: true
                }
            ],
            activeFilter: "all"
        };
    },
    methods: {
        activeAdmin: function(id, index) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد تفعيل هذا الحساب !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم تفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.mixin({ allowOutsideClick: false }).showLoading();
                    axios.put("/api/admin/admin/" + id + "/active").then(
                        response => {
                            if (response.status == 200) {
                                this.admins[index].state = 1;
                                Swal.fire(
                                    "نجاح",
                                    response.data.message,
                                    "success"
                                );
                            } else if (response.status == 204) {
                                Swal.fire(
                                    "فشل",
                                    "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه",
                                    "warning"
                                );
                            }
                        },
                        error => {
                            clearLogout(
                                this.$store,
                                this.$router,
                                error.response
                            );
                        }
                    );
                }
            });
        },
        disActiveAdmin: function(id, index) {
            Swal.fire({
                title: "هل أنت متأكد",
                text: "هل أنت متأكد من أنك تريد الغاء تفعيل هذا الحساب !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم إلغاء التفعيل",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.mixin({ allowOutsideClick: false }).showLoading();
                    axios.put("/api/admin/admin/" + id + "/disActive").then(
                        response => {
                            if (response.status == 200) {
                                this.admins[index].state = 0;
                                Swal.fire(
                                    "نجاح",
                                    response.data.message,
                                    "success"
                                );
                            } else if (response.status == 204) {
                                Swal.fire(
                                    "فشل",
                                    "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه",
                                    "warning"
                                );
                            }
                        },
                        error => {
                            clearLogout(
                                this.$store,
                                this.$router,
                                error.response
                            );
                        }
                    );
                }
            });
        },
        bannedAdmin: function(id, index) {
            Swal.fire({
                title: "هل أنت متأكد",
                text:
                    "هل أنت متأكد من أنك تريد حظر هذا الحساب ؟ إذا قمت بحظر الحساب فلا يمكنك استخدامه مجددا",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#16a085",
                cancelButtonColor: "#d33",
                confirmButtonText: "نعم حظر الحساب",
                cancelButtonText: "إلغاء"
            }).then(result => {
                if (result.isConfirmed) {
                    Swal.mixin({ allowOutsideClick: false }).showLoading();
                    axios.put("/api/admin/admin/" + id + "/banned").then(
                        response => {
                            if (response.status == 200) {
                                this.admins[index].state = 2;
                                Swal.fire(
                                    "نجاح",
                                    response.data.message,
                                    "success"
                                );
                            } else if (response.status == 204) {
                                Swal.fire(
                                    "فشل",
                                    "لم يعد هذا الحساب متوفرة, قد يكون شخص أخر قام بحذفه",
                                    "warning"
                                );
                            }
                        },
                        error => {
                            clearLogout(
                                this.$store,
                                this.$router,
                                error.response
                            );
                        }
                    );
                }
            });
        },
        changeFilter(filterName) {
            this.activeFilter = filterName;
        }
    },
    mounted() {
        this.$store.commit("activePage", 3);
        Swal.mixin({ allowOutsideClick: false, toast: false }).showLoading();
        axios.get("/api/admin/admin").then(
            response => {
                this.loaded = true;
                if (response.status == 200) {
                    this.admins = response.data.data;
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
                    }).fire("تنبيه", "لا يوجد اي مشرفين", "warning");
                }
            },
            error => {
                this.loaded = true;
                clearLogout(this.$store, this.$router, error.response);
            }
        );
    },
    computed: {
        filterAdmin() {
            var list = [];
            if (this.activeFilter == "all") {
                list = this.admins;
            } else if (this.activeFilter == "active") {
                for (var i = 0; i < this.admins.length; i++)
                    if (this.admins[i].state == 1) list.push(this.admins[i]);
            } else if (this.activeFilter == "notActive") {
                for (var i = 0; i < this.admins.length; i++)
                    if (this.admins[i].state == 0) list.push(this.admins[i]);
            } else if (this.activeFilter == "banned") {
                for (var i = 0; i < this.admins.length; i++)
                    if (this.admins[i].state == 2) list.push(this.admins[i]);
            }
            return list;
        }
    },
    created() {}
};
</script>

<style scoped>
table {
    border-collapse: separate;
    border-spacing: 0 1em;
}
</style>
