import axios from "axios";

const instance = axios.create({
    baseURL: 'https://vue-course-7f9dd-default-rtdb.europe-west1.firebasedatabase.app',
})


instance.interceptors.request.use(function(config) {
    console.log(config)
    return config
}, function(err) {
    return Promise.reject(err)
})

instance.interceptors.response.use(function(res) {
    console.log(res)
    return res
}, function(err) {
    return Promise.reject(err)
})

export default instance;