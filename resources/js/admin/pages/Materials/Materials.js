
import Swal from "sweetalert2";
export default {
    data() {
        return {
            materials: [],
            loaded: false,
            filter: [

            ],
            activeFilter: "all"
        };
    },
    methods: {

        changeFilter(filterName) {
            this.activeFilter = filterName;
        }
    },
    mounted() {
        this.$store.commit("activePage", 4);
        this.$loading.Start();
        this.$http
            .GetAllMaterials()
            .then(response => {
                this.$loading.Stop();
                this.loaded = true;
                if (response.status == 200) {
                    this.materials = response.data.data;
                    this.$alert.Success(response.data.message);
                } else if (response.status == 204) {
                    this.$alert.Empty("تنبيه لا يوجد اي مواد");
                }
            })
            .catch(error => {
                this.loaded = true;
                this.$loading.Stop();
                this.$alert.BadRequest(error.response);
            });
    },
    computed: {
        filterAdmin() {
            var list = [];
            list = this.materials;
            return list;
        }
    },
    created() {}
};
