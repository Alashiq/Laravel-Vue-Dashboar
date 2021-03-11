<template>
    <div>
        <div class="w-full text-5xl text-center my-20 text-red-500">
            Home Page
        </div>

        <router-link
            to="/admin"
            class="bg-blue-400 text-white px-2 py-2 rounded shadow"
        >
            home
        </router-link>

        <router-link
            to="/admin/login"
            class="bg-blue-400 text-white px-2 py-2 rounded shadow"
        >
            login
        </router-link>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    methods: {
        check:function(){
            alert("hello");
        }
    },
    mounted() {},
    computed: {},
    created() {},
};
</script>
