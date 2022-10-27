<template>
    <LayoutPadraoVue v-if="layout==0" :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl"/>
    <LayoutWithMediaVue v-if="layout==1" :RecentCalls="RecentCalls" :LastCalls="LastCalls" :envname="envname" :envUrl="envUrl"/>
</template>
<script>
import io from "socket.io-client"
import LayoutPadraoVue from "@/components/LayoutPadrao.vue"
import LayoutWithMediaVue from "@/components/LayoutWithMedia.vue"

export default {
    name: "WaitingRoomView",
    components:{
        LayoutPadraoVue: LayoutPadraoVue,
        LayoutWithMediaVue: LayoutWithMediaVue,
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
        }
    },
    methods: {
        calling: function (env) {
            console.log(env)
            if (this.verifyEnv(env)) {
                let calls = env.calls.filter(o => o.status == '2');
                this.RecentCalls = this.LastCalls = [];
                this.AllCalls = calls;
                this.RecentCalls = this.AllCalls.slice(0, 2);
                if (this.RecentCalls.length > 0)
                    this.voiceCall(this.RecentCalls[0].name + " no " + this.RecentCalls[0].place.name)
                if (this.AllCalls.length > 2)
                    this.LastCalls = this.AllCalls.slice(2, 6);
            }
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