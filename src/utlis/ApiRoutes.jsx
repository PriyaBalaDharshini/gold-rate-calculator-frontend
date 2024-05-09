const ApiRoutes = {
    SIGN_IN: {
        path: "/add-user",
        authenticate: false
    },
    LOG_IN: {
        path: "/login",
        authenticate: false
    },
    FORGOT_PASSWORD: {
        path: "/forgot-password",
        authenticate: false
    },

    RESET_PASSWORD: {
        path: "/reset-password",
        authenticate: false
    }


}
export default ApiRoutes