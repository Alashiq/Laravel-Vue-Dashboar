import Swal from "sweetalert2";
export default {
    data() {
        return {
            team: [],
            formData: {
            },
            formValidate: {
                name: "",
                job: "",
                facebook: "",
                twitter: "",
                linkedin: "",
                github: "",
                email: "",
                description: ""
            },
            loaded: false
        };
    },
    methods: {
        editTeamMember: function() {
            this.validateName();
            this.validateJob();
            this.validateFacebook();
            this.validateTwitter();
            this.validateLinkedin();
            this.validateGithub();
            this.validateEmail();
            this.validateDescription();
            if (this.formValidate.name != "") return 0;
            if (this.formValidate.job != "") return 0;
            if (this.formValidate.facebook != "") return 0;
            if (this.formValidate.twitter != "") return 0;
            if (this.formValidate.linkedin != "") return 0;
            if (this.formValidate.github != "") return 0;
            if (this.formValidate.email != "") return 0;
            if (this.formValidate.description != "") return 0;
            this.$loading.Start();
            this.$http.UpdateTeam(this.$route.params.id, this.formData)
            .then(response => {
                this.$loading.Stop();
                if (response.status == 200) {
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا العضو غير موجود");
                    this.team=[];
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
            if (this.formData.name.trim().length < 8) {
                this.formValidate.name = "يجب ان يكون الإٍسم 8 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.name.trim().length > 24) {
                this.formValidate.name = "يجب ان يكون الإسم أقل من 24 حرف";
                return 1;
            }
        },
        validateJob: function() {
            this.formValidate.job = "";
            if (this.formData.job.trim() == "") {
                this.formValidate.job = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.job.trim().length < 3) {
                this.formValidate.job = "يجب ان يكون الإٍم 4 أحرف أو اكثر";
                return 1;
            }
            if (this.formData.job.trim().length > 24) {
                this.formValidate.job = "يجب ان يكون الإسم أقل من 24 حرف";
                return 1;
            }
        },
        validateFacebook: function() {},
        validateTwitter: function() {},
        validateLinkedin: function() {},
        validateGithub: function() {},
        validateEmail: function() {},
        validateDescription: function() {
            this.formValidate.description = "";
            if (this.formData.description.trim() == "") {
                this.formValidate.description = "لا يمكن ترك هذا الحقل فارغ";
                return 1;
            }
            if (this.formData.description.trim().length < 20) {
                this.formValidate.description =
                    "يجب ان يكون نبذة عن العضور 20 حرف أو اكثر";
                return 1;
            }
            if (this.formData.description.trim().length > 200) {
                this.formValidate.description =
                    "يجب ان يكون نبذة عن العضو أقل من 200 حرف";
                return 1;
            }
        },
    },
    mounted() {
        this.$store.commit("activePage", 7);
        this.$loading.Start();
        this.$http
            .GetTeamById(this.$route.params.id)
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.team = response.data.data;
                    this.formData.name = response.data.data.name;
                    this.formData.job = response.data.data.job;
                    this.formData.facebook = response.data.data.facebook;
                    this.formData.twitter = response.data.data.twitter;
                    this.formData.linkedin = response.data.data.linkedin;
                    this.formData.github = response.data.data.github;
                    this.formData.email = response.data.data.email;
                    this.formData.description = response.data.data.description;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("هذا العضو غير متوفر");
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
