export default {
    Start($store) {
        $store.commit("loadingStart");
    },
    Stop($store) {
        $store.commit("loadingStop");
    },
}