export default {
    name: "poro",
    install(app,options){
        console.log("插件被安装",app,options)
        console.log(this.name)
    }
}