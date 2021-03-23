<template>
    <!-- Contact Form -->
    <div class="container mx-auto px-4 py-4 pb-36">
        <div
            class="text-center my-8 text-6xl tanseek secondary"
            data-aos="fade-right"
            data-aos-duration="1000"
        >
            <span class="primary">نموذج الإتصال</span>
            <span> بنا</span>
        </div>
        <div
            class="text-gray-400 text-center mb-12"
            data-aos="fade-up"
            data-aos-duration="800"
        >
            يمكنك التواصل معنا عبر ملئ النموذج التالي
        </div>
        <div class="w-full grid xl:grid-cols-4 md:grid-cols-2">
            <input
                v-model="formData.name"
                type="text"
                data-aos-delay="200"
                data-aos="fade-up"
                data-aos-duration="800"
                class="rounded bg-gray-50 border mx-3 h-12 px-4 outline-none focus:border-0 text-lg focus:ring-2 focus:ring-red-400 my-4"
                placeholder="الإسم"
            />
            <input
                v-model="formData.email"
                type="text"
                data-aos-delay="400"
                data-aos="fade-up"
                data-aos-duration="800"
                class="rounded bg-gray-50 border mx-3 h-12 px-4 outline-none focus:border-0 text-lg focus:ring-2 focus:ring-red-400 my-4"
                placeholder="البريد الإلكتروني"
            />
            <input
                v-model="formData.phone"
                type="text"
                data-aos-delay="600"
                data-aos="fade-up"
                data-aos-duration="800"
                class="rounded bg-gray-50 border mx-3 h-12 px-4 outline-none focus:border-0 text-lg focus:ring-2 focus:ring-red-400 my-4"
                placeholder="رقم الهاتف"
            />
            <select
                v-model="formData.for"
                type="text"
                data-aos-delay="800"
                data-aos="fade-up"
                data-aos-duration="800"
                class="rounded bg-gray-50 border mx-3 h-12 px-4 outline-none focus:border-0 text-lg focus:ring-2 focus:ring-red-400 my-4"
                placeholder="موجه إلى"
            >
                <option value="1">إدارة الشركة</option>
                <option value="2">فريق المطورين</option>
                <option value="3">الدعم الفني</option>
                <option value="4">قسم المبيعات</option>
            </select>
        </div>
        <div class="mx-3">
            <textarea
                v-model="formData.content"
                data-aos-delay="1000"
                data-aos="fade-up"
                data-aos-duration="800"
                class="rounded bg-gray-50 border text-lg px-3 py-3 w-full focus:ring-red-400 h-32"
                placeholder="محتوى الرسالة"
            ></textarea>
        </div>

        <div
            v-on:click="send"
            data-aos-delay="1200"
            data-aos="fade-up"
            data-aos-duration="800"
            class="px-4 mt-5 mx-3 text-lg text-white bg-secondary hover-bg-primary cursor-pointer rounded-full shadow-lg w-40 h-12 flex items-center justify-center"
        >
            إرسال
        </div>
    </div>
    <!-- End Contact Form -->
</template>

<script>
import Swal from "sweetalert2";
export default {
    data: function() {
        return {
            formData: {
                name: "",
                email: "",
                phone: "",
                for: "",
                content: ""
            }
        };
    },
    mounted() {},
    methods: {
        send: function() {
            Swal.showLoading();
            axios
                .post("api/web/message", this.formData)
                .then(response => {
                    Swal.fire("تهانينا", response.data.Message, "success");
                })
                .catch(function(error) {
                    Swal.fire("فشل", error.response.data.Message, "error");
                });
        }
    }
};
</script>
