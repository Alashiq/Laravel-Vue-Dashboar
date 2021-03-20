import Swal from "sweetalert2";

function clearLogout($store, $router, res) {
    if (res.status == 401) {
        Swal.fire(
            "فشل",
            "انتهت الجلسة الخاصة بك قم بعمل تسجيل دخول مجددا",
            "warning"
        );

        localStorage.removeItem("token");
        $store.commit("clearUser");
        $router.push("/admin/login");
    } else
        Swal.fire("فشل", res.data.message, "warning");
}

export { clearLogout };
