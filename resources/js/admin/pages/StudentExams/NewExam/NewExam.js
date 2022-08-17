export default {
    data() {
        return {
            materialList: [
                {
                    id:1,
                    name:"one",
                }
            ],
            formData: {
                name: "a",
                description: "b",
                materialId: 1,
                q1: "Qustion One",
                q1A: "Opetion A",
                q1B: "Option B",
                q1C: "Option C",
                q1True: 1,
                q1Point: 0,

                q2: "Qustion Two",
                q2A: "Option A",
                q2B: "Optrion B",
                q2C: "Optrion C",
                q2True: 1,
                q2Point: 0,

                q3: "Qustion Three",
                q3A: "Option A",
                q3B: "Option B",
                q3C: "Option C",
                q3True: 1,
                q3Point: 0,
            },
            formValidate: {
                name: "",
                description: ""
            },
            previewImage: null
        };
    },
    methods: {
        addTeamMember: function() {
            alert("hew ex");
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.description != "") return 0;
            alert("after");

            this.$loading.Start();
            const config = {
                headers: {
                    "content-type": "multipart/form-data"
                }
            };
            let data = new FormData();
            data.append("name", this.formData.name);
            data.append("description", this.formData.description);
            data.append("material_id", this.formData.materialId);
            data.append("q1", this.formData.q1);
            data.append("q1_a", this.formData.q1A);
            data.append("q1_b", this.formData.q1B);
            data.append("q1_c", this.formData.q1C);
            data.append("q1_true", this.formData.q1True);
            data.append("q1_point", this.formData.q1Point);

            data.append("q2", this.formData.q2);
            data.append("q2_a", this.formData.q2A);
            data.append("q2_b", this.formData.q2B);
            data.append("q2_c", this.formData.q2C);
            data.append("q2_true", this.formData.q2True);
            data.append("q2_point", this.formData.q2Point);

            data.append("q3", this.formData.q3);
            data.append("q3_a", this.formData.q3A);
            data.append("q3_b", this.formData.q3B);
            data.append("q3_c", this.formData.q3C);
            data.append("q3_true", this.formData.q3True);
            data.append("q3_point", this.formData.q3Point);

            this.$http
                .PostNewExam(data, config)
                .then(response => {
                    this.$loading.Stop();
                    this.$alert.Success(response.data.message);
                    this.formData.name = "";
                    this.formData.description = "";
                })
                .catch(error => {
                    this.$loading.Stop();
                    console.log(error.response);
                    this.$alert.BadRequest(error.response);
                });
        },
        onChange(e) {
            this.formData.file = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(this.formData.file);
            reader.onload = e => {
                this.previewImage = e.target.result;
            };
        },
        validateName: function() {
            this.formValidate.name = "";
            if (this.formData.name.trim() == "") {
                this.formValidate.name = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.name.trim().length <= 5) {
                this.formValidate.name = "يجب ان يكون الإسم 5 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 24) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 24 حرف";
                return 1;
            }
        },


        validateDescription: function() {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.description.trim().length < 20) {
                this.formValidate.description = "يجب ان يكون الوصف 20 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.description.trim().length > 130) {
                this.formValidate.description = "يجب ان يكون الوصف أقل من 130 حرف";
                return 1;
            }
        },

    },
    mounted() {
        this.$store.commit("activePage", 7);

        this.$loading.Start();
        this.$http
            .GetAllMaterials()
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.materialList = response.data.data;
                    console.log(this.materialList);
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("تنبيه لا يوجد اي مواد دراسية");
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
