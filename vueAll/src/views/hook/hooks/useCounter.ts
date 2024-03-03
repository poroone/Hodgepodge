import { Ref, ref, watch } from "vue"
export default function () {
    const counter: Ref<number> = ref(0)
    const Multment: any = (num) => counter.value *= num
    const increment= (): number  => counter.value++
    const decrement= (): number  => counter.value--
    return {
        counter,
        Multment,
        increment,
        decrement
    }
}


