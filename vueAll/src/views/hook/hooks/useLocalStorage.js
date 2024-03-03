import { ref, watch } from "vue"

export default function (kay, value) {
    const data = ref(value)
    if (value) {
        localStorage.setItem(key, JSON.stringify(value))
    } else {
        data.value = JSON.parse(localStorage.getItem(key))
    }
    watch(data, () => {
        localStorage.setItem(key, JSON.stringify(value))
    })
    return data
}