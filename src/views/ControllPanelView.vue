<template>
    <div class="holder d-flex  justify-content-center">
        <div class="container ">
            <header class="text-center my-5">
                <h1 class="display-4">Painel de controle</h1>
            </header>
            <div class="row ">
                <div class="col mx-auto">
                    <div class="card rounded border-0 shadow-sm position-relative">
                        <div class="card-body  p-5">
                            <div class="d-flex justify-content-between align-items-end">
                                <h1>Ambientes</h1>
                                <div>
                                    <button type="button" class="btn btn-sm btn-primary " data-bs-toggle="modal"
                                        data-bs-target="#myModal" @click="novoAmbiente()">
                                        <i class='fa fa-plus'></i> Novo ambiente
                                    </button>
                                </div>
                            </div>
                            <table class="table">
                                <thead>
                                    <th>Nome</th>
                                    <th>Açõe</th>
                                </thead>
                                <tbody>
                                    <tr  v-for="(env,index) in environments" :key="index">
                                        <td>{{env.name}}</td>
                                        <td>
                                            <router-link  class="btn btn-sm btn-outline-primary mx-2"
                                            :to="'/environment/'+env.id" >
                                                <i class="fas fa-external-link-alt"></i> Abrir
                                            </router-link>
                                            <button type="button" class="btn btn-sm btn-outline-danger mx-2" >
                                                <i class='fas fa-trash'> </i> Remover
                                            </button>  
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
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
                        <h4 class="modal-title">criar novo ambiente</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="row">
                                <div class="form-floating m-1">
                                    <input v-model="ambiente.name"  class="form-control form-control-sm ">
                                    <label >Nome do ambiente</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-2 form-floating m-1">
                                    <select class="form-select" v-model="ambiente.media.type">
                                        <option selected>selecione</option>
                                        <option :key="index" v-for="item,index in mediaTypes" :value="item" >{{item}}</option>
                                    </select>
                                    <label >tipo de media</label>
                                </div>
                                <div class="col form-floating m-1">
                                    <input v-model="ambiente.media.url"  class="form-control form-control-sm ">
                                    <label >url video/imagem</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 form-floating m-1">
                                    <select class="form-select" v-model="ambiente.layout">
                                        <option selected>selecione</option>
                                        <option :key="index" v-for="item,index in layouts" :value="item" >{{item.name}}</option>
                                    </select>
                                    <label >Layouts</label>
                                </div>
                                <div class="col-sm-1">
                                    <label for="exampleColorInput" class="form-label">Cores</label>
                                </div>
                                <div class="col-sm-1">
                                    <input type="color" class="form-control form-control-sm form-control-color" v-model="ambiente.theme.cor1">
                                </div>
                                <div class="col-sm-1">
                                    <input type="color" class="form-control form-control-sm form-control-color" v-model="ambiente.theme.cor2">
                                </div>
                                <div class="col-sm-1">
                                    <input type="color" class="form-control form-control-sm form-control-color" v-model="ambiente.theme.cor3">
                                </div>
                                <div class="col-sm-1">
                                    <input type="color" class="form-control form-control-sm form-control-color" v-model="ambiente.theme.cor4">
                                </div>
                            </div>
                            <div class="row">
                                <table class="table table-sm m-3 table-borderless caption-top">
                                    <caption>lista de locais</caption>
                                    <thead>
                                        <tr>
                                        <th scope="col">local</th>
                                        <th scope="col">Sigla</th>
                                        <th scope="col"> </th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        <tr :key="index" v-for="(local,index) in ambiente.places"> 
                                            <td><input v-model="local.name"  class="form-control" placeholder="Nome do local"></td>
                                            <td><input v-model="local.type"  class="form-control" placeholder="Sigla do local"></td>
                                            <td>
                                                <div class="d-flex align-items-end">
                                                <button v-show="index == (ambiente.places.length - 1)"
                                                    class="btn btn-sm btn-primary m-2 " @click="ambiente.places.push({name:null,type:null})">
                                                    <i class='fa fa-plus'></i>
                                                </button>
                                                <button v-show="index < (ambiente.places.length - 1)"
                                                    class="btn btn-sm btn-danger m-2 " @click="ambiente.places.splice(index,1)">
                                                    <i class='fa fa-trash-alt'></i>
                                                </button>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        <button class="btn  btn-primary " data-bs-dismiss="modal" @click="createEnv()"><i
                                class='fa fa-plus'></i>
                            Salvar</button>
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
            layouts:[
                {id:1,name:"com video", recentCalls:2, lastCalls:4},
                {id:2,name:"sem video", recentCalls:1, lastCalls:6},
                {id:3,name:"somente numero sem midia", recentCalls:1, lastCalls:0},
                {id:4,name:"somente numero com midia", recentCalls:1, lastCalls:0},
            ],
            mediaTypes:["image","video"],
            theme:{
                nome:"padrao",
                cor1:"",
                cor2:"",
                cor3:"",
                cor4:"",
            },
            ambiente: {
                name: "Apartamento",
                media:{
                    type:"image",
                    url: "https://www.ryazbek.com.br/wp-content/uploads/2019/11/original-ccba23ab2eb493b23837674485286bcf.jpg",
                },
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
                theme:{},
                layout:{}
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
          console.log(this.ambiente)

          this.socket.emit("createEnv", this.ambiente);
          this.novoAmbiente();
        },
        novoAmbiente: function () {
          this.ambiente = {
            name: "",
            media:{type:"", url: ""},
            places: [{
              name: null,
              type: null
            }],
            theme:{},
            layout:{}
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
            .on("updatecall", this.calling);
    },
}
</script>