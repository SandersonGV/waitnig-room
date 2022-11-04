<template>
  <div class="holder d-flex  justify-content-center">
    <div class="container ">
      <header class="text-center my-5">
          <h1 class="display-4"> {{nomeAmbiente}} - senhas chamadas</h1>
      </header>
      <div class="card rounded border-0 shadow-sm position-relative">
        <div class="card-body">
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
                  <button type="button" class="btn btn-sm btn-primary " data-bs-toggle="modal"
                      data-bs-target="#myModal" @click="newTicket" >
                      <i class='fa fa-plus'></i> Novo Ticket
                  </button>
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

    <div class="modal" id="myModal">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title"> Novo Ticket </h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                          <div class="col-4 form-floating">
                                <select class="form-select" v-model="ticket.place">
                                    <option selected >selecione</option>
                                    <option :key="index" v-for="item,index in places" :value="item" >{{item.name}}</option>
                                </select>
                                <label >Locais</label>
                            </div>
                            <div class="col-8 form-floating">
                                <input v-model="ticket.text" class="form-control form-control-sm ">
                                <label >Texto</label>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button class="btn  btn-primary " data-bs-dismiss="modal" @click="queueTicket"><i
                                class='fa fa-plus'></i>
                            Criar</button>
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
        ticket: {},
        places:[],
      }},
      methods: {
        calling: function (env) {
          if (this.verifyEnv(env)) {
            this.nomeAmbiente = env.name;
            let calls = env.calls.filter(o => o.status == '2');
            let queue = env.calls.filter(o => o.status == '1');
            this.AllCalls = calls;
            this.AllQueue = queue;
            this.places = env.places;
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
        newTicket: function(){
          this.ticket = {place:{id:""},text:""};
        },
        queueTicket: function () {
          if(this.ticket.place.id=="" || this.ticket.text==""){
            alert('preencha todos os campos')
            return;
          }
            
          let id = this.ticket.place.id;
          let text = this.ticket.text;
          if (!this.myenv) {
            alert('ambiente indisponivel')
          }
          if (id) {
            this.socket.emit("queue", {
              placeid: id,
              text: text,
              env: this.myenv,
              print: 1
            });
          }
        },
        verifyEnv: function (env) {
          return this.myenv == env.id;
        },
        initAtendente: function () {
            this.socket.emit("initAtendente", this.myenv);
        },
      },
      mounted() {
        this.socket.on("updatecall", this.calling);
        this.initAtendente();
      },
    created() {
        this.myenv = this.$route.params.env
    },
}
</script>