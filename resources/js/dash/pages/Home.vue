<template>
    <div class="w-auto md:p-8 p-4">
        <div class="w-full grid xl:grid-cols-3" v-if="loaded">
            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-blue-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-eye"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.todayVisitor }} زائر
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        الزيارات اليوم
                    </div>
                </div>
            </div>

            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-green-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-eye"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.weekVisitor }} زائر
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        زيارات الأسبوع
                    </div>
                </div>
            </div>

            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-red-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-eye"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.monthVisitor }} زائر
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        زيارات الشهر
                    </div>
                </div>
            </div>

            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-yellow-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-comment-dots"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.todayMessage }} رسالة
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        رسائل اليوم
                    </div>
                </div>
            </div>

            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-gray-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-comment-dots"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.notSloveMessage }} رسالة
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        الرسائل الغير محلولة
                    </div>
                </div>
            </div>

            <div
                class="h-40 bg-white shadow-3 mx-3 mb-8 px-6 rounded-lg flex items-center"
            >
                <div
                    class="h-16 w-16 bg-green-400 rounded-full text-2xl items-center justify-center flex text-white"
                >
                    <i class="fas fa-comment-dots"></i>
                </div>
                <div class="mr-8">
                    <div
                        class="text-3xl text-gray-700 font-semibold h-20 flex items-center"
                    >
                        {{ data.sloveMessage }} رسالة
                    </div>
                    <div class="text-gray-500 flex items-center h-4">
                        الرسائل المحلولة
                    </div>
                </div>
            </div>
        </div>

        <div class="w-auto mx-4 bg-white shadow-3 mt-8 rounded-lg px-6" v-if="loaded">
            <div
                class="h-20 w-full flex items-center text-2xl bg-blu font-semibold cairo text-gray-600 border-b"
            >
                مخطط الزيارات
            </div>

            <div class="h-96 w-full"></div>
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
    data() {
        return {
            data: {
                todayMessage: 0,
                notSloveMessage: 0,
                sloveMessage: 0,
                todayVisitor: 0,
                weekVisitor: 0,
                monthVisitor: 0
            },
            loaded: false
        };
    },
    methods: {},
    mounted() {
        this.$store.commit("activePage", 1);
        Swal.mixin({ allowOutsideClick: false }).showLoading();
        axios.get("/api/admin/home/").then(
            response => {
                this.loaded = true;
                if (response.status == 200) {
                    this.data = response.data.data;
                    Swal.mixin({
                        position: "bottom-start",
                        timer: 3000,
                        toast: true,
                        showConfirmButton: false
                    }).fire("نجاح", response.data.message, "success");
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
