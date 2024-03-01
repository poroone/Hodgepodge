const helloMixin = {
    created() {
        this.hello()
    },
    methods: {
        hello() {
            console.log("hello")
        }
    }

}

export default helloMixin