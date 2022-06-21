export default {
    data() {
        return {
            roleList: [],
            formData: {
                name: "",
                description: "",
                admin_id: 1,
                year_id: 1,
            },
            formValidate: {
                name: "",
                description: "",
            },
            loaded: false
        };
    },
    methods: {
        addAdmin: function() {
            this.validateName();
            this.validateDescription();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.description != "") return 0;

        this.$loading.Start();
        this.$http
            .PostNewMaterial(this.formData)
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                    this.$alert.Success(response.data.message);
                    this.formData.name = "";
                    this.formData.description = "";
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
        validateDescription: function() {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.description.trim().length < 5) {
                this.formValidate.description =
                    "يجب ان وصف المادة 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.description.trim().length > 16) {
                this.formValidate.description =
                    "يجب ان يكون وصف المادة أقل من 16 حرف";
                return 1;
            }
        },

    },
    mounted() {
        this.$store.commit("activePage", 4);

        this.$loading.Start();
        this.$http
            .GetAdminRolesForNewAdmin()
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.roleList = response.data.roleList;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("تنبيه لا يوجد اي أدوار");
                }
            })
            .catch(error => {
                this.$loading.Stop();
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {},
    created() {}
};
