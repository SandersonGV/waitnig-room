<template>
    <div>
        <div class="container mt-5">
            <div class="row ">
                <h1 class="text-center">Painel de controle</h1>
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex justify-content-between">
                            <h1>Ambientes</h1>
                            <button type="button" class="btn btn-sm btn-primary " data-bs-toggle="modal"
                                data-bs-target="#myModal" @click="novoAmbiente()">
                                Novo ambiente
                            </button>
                        </div>
                        <div id="accordion">
                            <div class="card mt-2" v-for="(env,index) in environments" :key="index">
                                <div class="card-header d-flex justify-content-between">
                                    <div>
                                        <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                                            data-bs-target="#myModal" @click="editAmbiente(env)">
                                            <i class='fas fa-edit'></i>
                                        </button>
                                        {{env.name}}
                                    </div>
                                    <div>
                                        <a class="btn btn-sm btn-outline-info float-right" data-bs-toggle="collapse"
                                            :data-bs-target="'#collapse'+index">
                                            <i class='fas fa-receipt'></i> Tickets <span
                                                class="badge bg-danger">{{env.calls.length}}</span>
                                        </a>
                                        <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                            :to="'/totem/'+env.id" >
                                            <i class='fas fa-table'></i> Totem
                                        </router-link>
                                        <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                            :to="'/WaitingRoom/'+env.id">
                                            <i class='fas fa-tv'></i> Sala de espera
                                        </router-link>
                                        <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                            :to="'/Attendant/'+env.id">
                                            <i class='far fa-user'></i> Atendente
                                        </router-link>
                                    </div>
                                </div>
                                <div :id="'collapse'+index" class="collapse" data-bs-parent="#accordion">
                                    <div class="card-body row">
                                        <div class="col-6">
                                            <div>Espera</div>
                                            <ul v-for="(call,index) in env.calls.filter(o=>o.status == '1')"
                                                :key="index" class="list-group">
                                                <li class="list-group-item m-1">
                                                    <div class="d-flex justify-content-between ">
                                                        <div>{{call.name}} </div>
                                                        <div><button class="btn btn-sm btn-warning float-right"
                                                                @click="callTicket(call.id, env.id)"><i
                                                                    class='far fa-bell'></i></button>
                                                            <button class="btn btn-sm btn-danger float-right"
                                                                @click="dropCall(call.id, env.id)">
                                                                <i class="	far fa-trash-alt"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="col-6">
                                            <div>Chamando</div>
                                            <ul v-for="(call,index ) in env.calls.filter(o=>o.status == '2')"
                                                :key="index" class="list-group">
                                                <li class="list-group-item m-1">
                                                    <div class="d-flex justify-content-between ">
                                                        <div>{{call.name}} </div>
                                                        <div><button class="btn btn-sm btn-warning float-right"
                                                                @click="callTicket(call.id, env.id)"><i
                                                                    class='far fa-bell'></i></button>
                                                            <button class="btn btn-sm btn-danger float-right"
                                                                @click="dropCall(call.id, env.id)">
                                                                <i class="	far fa-trash-alt"></i>
                                                            </button>
                                                        </div>
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
            </div>

        </div>


        <div class="modal" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">criar novo ambiente</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="row">
                                <input class="form-control m-2" placeholder="Nome do ambiente" v-model="ambiente.name">
                                <input class="form-control m-2" placeholder="url video/imagem" v-model="ambiente.url">
                            </div>
                            <div class="row">
                                <p>locais
                                </p>
                                <ul class="list-group mb-3">
                                    <li class="list-group-item d-flex" :key="index"
                                        v-for="(local,index) in ambiente.places">
                                        <input class="form-control m-2" placeholder="Nome do local"
                                            v-model="local.name">
                                        <input class="form-control m-2" placeholder="Sigla do local"
                                            v-model="local.type">
                                        <button v-show="index == (ambiente.places.length - 1)"
                                            class="btn btn-sm btn-primary m-2 "
                                            @click="ambiente.places.push({name:null,type:null})">
                                            <i class='fa fa-plus'></i>
                                        </button>
                                        <button v-show="index < (ambiente.places.length - 1)"
                                            class="btn btn-sm btn-danger m-2 " @click="ambiente.places.splice(index,1)">
                                            <i class='fa fa-trash-alt'></i>
                                        </button>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        <button class="btn  btn-primary " data-bs-dismiss="modal" @click="createEnv()"><i
                                class='fa fa-plus'></i>
                            criar
                            ambiente</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from "socket.io-client"
export default {
    name: "ControllPanel",
    data() {
        return {
            socket: io("http://localhost:3000"),
            environments: [],
            ambiente: {
                name: "Apartamento",
                url: "https://www.ryazbek.com.br/wp-content/uploads/2019/11/original-ccba23ab2eb493b23837674485286bcf.jpg",
                places: [{
                    name: "sala",
                    type: "SL"
                },
                {
                    name: "quarto",
                    type: "QT"
                },
                {
                    name: "cozinha",
                    type: "CZ"
                },
                ],
            },
        }
    },
    methods: {
        calling: function () {
          this.listEnvs();
        },
        listEnvs: function () {
          this.socket.emit("listEnv");
        },
        getEnvs: function (envs) {
          this.environments = envs
        },
        callTicket: function (id, env) {
            this.socket.emit("call", {
            id: id,
            env: env
          });
        },
        dropCall: function (id, env) {
            this.socket.emit("dropCall", {
            id: id,
            env: env
          });
        },
        createEnv: function () {
          if (!this.ambiente) {
            alert("nome não pode ser vazio")
            return;
          }
          this.socket.emit("createEnv", this.ambiente);
          this.novoAmbiente();
        },
        novoAmbiente: function () {
          this.ambiente = {
            name: "",
            url: "",
            places: [{
              name: null,
              type: null
            }]
          }
        },
        editAmbiente: function (env) {
          this.ambiente = env
        },
    },
    mounted() {
        this.listEnvs();
        this.socket
            .on("listEnv", this.getEnvs)
            .on("createEnv", this.getEnvs)
            .on("call", this.calling);
    },
}
</script>