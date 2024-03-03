import { ref, reactive, watch } from "vue"
export default function (title = "默认值") {
    const titleRef = ref(title)
    watch(titleRef, (newView) => {
      
        document.title = newView
    }, {
        immediate: true
    })
    return titleRef
}