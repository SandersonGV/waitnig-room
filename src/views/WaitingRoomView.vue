<template>
    <div>
        <LayoutWithMediaVue v-if="layout==1" :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl" :theme="theme" />
        <LayoutWithOutMedia v-else-if="layout==2" :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl" :theme="theme" />
        <LayoutOnlyOne v-else-if="layout==3" :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl" :theme="theme" />
        <LayoutPadraoVue v-else :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl"/>
    </div>
</template>
<script>
import io from "socket.io-client"
import LayoutPadraoVue from "@/components/LayoutPadrao.vue"
import LayoutWithMediaVue from "@/components/LayoutWithMedia.vue"
import LayoutWithOutMedia from "@/components/LayoutWithOutMedia.vue"
import LayoutOnlyOne from "@/components/LayoutOnlyOne.vue"


export default {
    name: "WaitingRoomView",
    components:{
        LayoutPadraoVue: LayoutPadraoVue,
        LayoutWithMediaVue: LayoutWithMediaVue,
        LayoutWithOutMedia: LayoutWithOutMedia,
        LayoutOnlyOne: LayoutOnlyOne,
    },
    data() {
        return {
            socket: io("http://localhost:3000"),
            AllCalls: [],
            RecentCalls: [],
            LastCalls: [],
            envUrl: "",
            envname: "",
            myenv: "",
            horaAtual: "",
            dataAtual: "",
            layout: "1",
            theme:{},
        }
    },
    methods: {
        calling: function (env) {
            console.log(env)
            if (this.verifyEnv(env)) {
                let calls = env.calls.filter(o => o.status == '2');
                this.RecentCalls = this.LastCalls = [];
                this.AllCalls = calls;
                this.RecentCalls = this.AllCalls.length > 2? this.AllCalls.slice(0, env.layout.recentCalls):this.AllCalls;
                this.theme = env.theme;
                if (this.RecentCalls.length > 0){
                    let calltext = this.RecentCalls[0].name + " em " + this.RecentCalls[0].place.name
                    this.voiceCall(calltext)
                }
                this.layout = env.layout.id;

                if (this.AllCalls.length > env.layout.recentCalls){    
                    this.LastCalls = this.AllCalls.slice(env.layout.recentCalls, (env.layout.recentCalls+env.layout.lastCalls));
                }
            }
            console.log(this.RecentCalls)
        },
        voiceCall: function (text) {
            let speaker = window.speechSynthesis;
            let voice = new SpeechSynthesisUtterance(text);
            voice.pitch = 1;
            voice.rate = 1;
            speaker.speak(voice);
            voice.onerror = function (e) {
                console.log(e)
            }
        },
        verifyEnv: function (env) {
            return this.myenv == env.id;
        },
        initWaitRoom: function () {
            this.socket.emit("initWaitRoom", this.myenv);
        },
        configWaitRoom: function (data) {
            this.envUrl = data.url;
            this.envname = data.name;
            this.calling(data)
        }
    },
    mounted() {
        this.socket.on("call", this.calling);
        this.socket.on("initWaitRoom", this.configWaitRoom);
        this.initWaitRoom()
    },
    created() {
        this.myenv = this.$route.params.env
    },
}
</script>