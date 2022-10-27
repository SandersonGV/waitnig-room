<template>
    <div class="container-fluid ">
        <div class="row min-vh-100 min-vw-100">
            <div class="row p-3 " style="height: 65vh;">
                <div class="col-8">
                    <img style="width: 100%; height: 100%;" :src="envUrl" />
                </div>
                <div class="col-4">
                    <h2>Chamando agora</h2>
                    <div class="d-flex flex-column ">
                        <div class="card bg-info mt-4 " :key="index" v-for="call,index in RecentCalls" style="height:25vh;">
                            <div class="card-body text-center">
                                <h1 class="card-title">{{call.name}}</h1>
                                <div class="card-text">
                                    <div class="alert alert-info">{{call.place.name}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row p-3 " style="height: 30vh;">
                <div class="d-flex ">
                    <div class="p-3 m-3 d-flex" style="width: 10%;">
                        <h2 class="align-self-center">Ultimas<br>senhas</h2>
                    </div>
                    <div class="card bg-light p-3 m-3 " :key="index" v-for="call,index in LastCalls" style="width: 20%;">
                        <div class="card-body text-center">
                            <h1 class="card-title">{{call.name}}</h1>
                            <div class="card-text">
                                <div class="alert alert-secondary">{{call.place.name}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row bg-info rounded-2" style="height: 5vh; font-size: large;">
                <div class="d-flex  align-items-center flex justify-content-between">
                    <div class="">{{envname}} </div>
                    <div class="">
                        <span><i class="far fa-calendar-alt"></i> {{dataAtual}}</span>
                        <span><i class="far fa-clock"></i> {{horaAtual}}</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import io from "socket.io-client"
export default {
    name: "WaitingRoomView",
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
        },
        getDateTime: function () {
            let dataObj = new Date();

            let diaSemana = dataObj.toLocaleString('default', { weekday: 'long' });
            let data = dataObj.toLocaleDateString();
            let hora = dataObj.toLocaleTimeString("default", { hour: '2-digit', minute: '2-digit' })

            this.dataAtual = diaSemana + " | " + data;
            this.horaAtual = hora.replace(":", "h")
        },
    },
    mounted() {
        this.socket.on("call", this.calling);
        this.socket.on("initWaitRoom", this.configWaitRoom);
        this.initWaitRoom()

        this.getDateTime();
        setInterval(() => {
            this.getDateTime();
        }, 1000);
    },
    created() {
        this.myenv = this.$route.params.env
    },
}
</script>