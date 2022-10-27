<template>
<div class="container mt-5">
      <div class="card">
        <div class="card-body">
          <h1 class="text-center"> {{nomeAmbiente}} - senhas chamadas</h1>

          <nav class="nav nav-tabs" id="nav-tab" role="tablist">
            <a class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" href="#nav-home" role="tab"
              aria-controls="nav-home" aria-selected="true">Fila de espera</a>
            <a class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" href="#nav-profile" role="tab"
              aria-controls="nav-profile" aria-selected="false">Chamados</a>
          </nav>
          <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
              <div class="card border-0">
                <div class="card-body">
                  <h3 class="text-center">Fila de espera</h3>
                </div>
                <div class="card-body">
                <input class="form-control" placeholder="Nome do cliente" v-model="nomeCliente">
                  <ul :key="index" v-for="call,index in AllQueue" class="list-group">
                    <li class="list-group-item m-2">
                      <div class="d-flex justify-content-between ">
                        <div>{{call.name}} </div>
                        <button class="btn btn-sm btn-warning float-right" @click="callTicket(call.id)"><i
                            class='far fa-bell'></i></button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
            <div class="card border-0 ">
                <div class="card-body">
                  <h3 class="text-center">chamados</h3>
                </div>
                <div class="card-body ">
                  <ul :key="index" v-for="call,index in AllCalls" class="list-group">
                    <li class="list-group-item m-2">
                      <div class="d-flex justify-content-between ">
                        <div>{{call.name}} </div>
                        <button class="btn btn-sm btn-warning float-right" @click="callTicket(call.id)"><i
                            class='far fa-bell'></i></button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import io from "socket.io-client"
export default {
    name: "AttendantView",
    data(){return {
        socket: io("http://localhost:3000"),
        AllCalls: [],
        AllQueue: [],
        nomeAmbiente: "",
        myenv: "",
        nomeCliente: "",
      }},
      methods: {
        calling: function (env) {
          if (this.verifyEnv(env)) {
            this.nomeAmbiente = env.name;
            let calls = env.calls.filter(o => o.status == '2');
            let queue = env.calls.filter(o => o.status == '1');
            this.AllCalls = calls;
            this.AllQueue = queue;
          }
        },
        callTicket: function (id) {
            this.socket.emit("call", {
            id: id,
            nomeCliente: this.nomeCliente,
            env: this.myenv
          });
          this.nomeCliente = "";
        },
        verifyEnv: function (env) {
          return this.myenv == env.id;
        },
        initAtendente: function () {
            this.socket.emit("initAtendente", this.myenv);
        },
      },
      mounted() {
        this.socket.on("call", this.calling);
        this.initAtendente();
      },
    created() {
        this.myenv = this.$route.params.env
    },
}
</script>