<template>
    <div class="holder d-flex  justify-content-center">
        <div class="container ">
            
            <header class="text-center my-5">
                <h1 class="display-4">Manutenir ambiente</h1>
            </header>

            <div class="row ">
                <div class="col mx-auto">
                    <div class="card rounded border-0 shadow-sm position-relative">
                        <div class="card-body  p-5">
                            <div class="d-flex justify-content-between align-items-end">
                                <h3>Nome: {{env.name}}</h3>
                                <div>
                                    <button type="button" class="btn btn-sm btn-outline-primary" data-bs-toggle="modal"
                                        data-bs-target="#myModal" @click="editAmbiente(env)">
                                        <i class='fas fa-edit'></i> Editar
                                    </button>
                                    <router-link type="button" class="btn btn-sm btn-outline-danger mx-1" to="/">
                                        <i class='fas fa-arrow-left'></i> voltar
                                    </router-link>
                                </div>
                            </div>
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-info-tab" data-bs-toggle="pill" data-bs-target="#pills-info" type="button" role="tab" aria-controls="pills-info" aria-selected="true">Informações</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link " id="pills-links-tab" data-bs-toggle="pill" data-bs-target="#pills-links" type="button" role="tab" aria-controls="pills-links" aria-selected="false">Links</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-tickets-tab" data-bs-toggle="pill" data-bs-target="#pills-tickets" type="button" role="tab" aria-controls="pills-tickets" aria-selected="false">
                                        Tickets 
                                        <span class="badge bg-danger">{{env.calls.length}}</span>
                                    </button>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-info" role="tabpanel" aria-labelledby="pills-info-tab" tabindex="0">
                                    <div class="row">
                                        <div class="col-2">
                                            <span> Layout:  </span>
                                        </div>
                                        <div class="col">
                                            <span>  {{env.layout.name}} </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-2">
                                            <span> Tipo da midia: </span>
                                        </div>
                                        <div class="col">
                                            <span> {{env.media?.type||""}} </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-2">
                                            <span> Url:  </span>
                                        </div>
                                        <div class="col">
                                            <span>  {{env.media.url}} </span>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <table class="table table-sm  caption-top">
                                                <caption>lista de locais</caption>
                                                <thead>
                                                    <tr>
                                                    <th scope="col">local</th>
                                                    <th scope="col">Sigla</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr :key="index" v-for="(local,index) in env.places"> 
                                                        <td>{{local.name}}</td>
                                                        <td>{{local.type}}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-links" role="tabpanel" aria-labelledby="pills-links-tab" tabindex="0">
                                    <div class="row">
                                        <div class="col">
                                            <table class="table table-sm  caption-top">
                                                <caption>Links</caption>
                                                <thead>
                                                    <tr>
                                                    <th scope="col">link</th>
                                                    <th scope="col">Ação</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr > 
                                                        <td>
                                                            <span><i class='fas fa-table mx-1'></i> Toten </span>
                                                        </td>
                                                        <td class="text-end">
                                                            <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                                                :to="'/totem/'+env.id" >
                                                                <i class='fas fa-external-link-alt'></i> Abrir
                                                            </router-link>
                                                            <a class="btn btn-sm btn-outline-info float-right mx-1" 
                                                                @click="copytoclipboard('/totem/'+env.id)" >
                                                                <i class='fas fa-link'></i> Copiar link
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr > 
                                                        <td>
                                                            <span><i class='far fa-user mx-1'></i> Atendente </span>
                                                        </td>
                                                        <td class="text-end">
                                                            <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                                                :to="'/Attendant/'+env.id" >
                                                                <i class='fas fa-external-link-alt'></i> Abrir
                                                            </router-link>
                                                            <a class="btn btn-sm btn-outline-info float-right mx-1" 
                                                                @click="copytoclipboard('/Attendant/'+env.id)" >
                                                                <i class='fas fa-link'></i> Copiar link
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    <tr > 
                                                        <td>
                                                            <span><i class='fas fa-tv mx-1'></i> Sala de espera </span>
                                                        </td>
                                                        <td class="text-end">
                                                            <router-link class="btn btn-sm btn-outline-info float-right" target="_blank"
                                                                :to="'/WaitingRoom/'+env.id" >
                                                                <i class='fas fa-external-link-alt'></i> Abrir
                                                            </router-link>
                                                            <a class="btn btn-sm btn-outline-info float-right mx-1" 
                                                                @click="copytoclipboard('/WaitingRoom/'+env.id)" >
                                                                <i class='fas fa-link'></i> Copiar link
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-tickets" role="tabpanel" aria-labelledby="pills-tickets-tab" tabindex="0">
                                    <div class="card-body row">
                                        <div class="col-6">
                                            <div>Espera</div>
                                            <ul v-for="(call,index) in env.calls.filter(o=>o.status == '1')"
                                                :key="index" class="list-group ">
                                                <li class="list-group-item">
                                                    <div class="d-flex justify-content-between ">
                                                        <div>{{call.name}} </div>
                                                        <div>
                                                            <button class="btn btn-sm btn-warning float-right mx-1"
                                                                @click="callTicket(call.id, env.id)"><i
                                                                    class='far fa-bell'></i></button>
                                                            <button class="btn btn-sm btn-danger float-right mx-1"
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
                                                        <div><button class="btn btn-sm btn-warning float-right mx-1"
                                                                @click="callTicket(call.id, env.id)"><i
                                                                    class='far fa-bell'></i></button>
                                                            <button class="btn btn-sm btn-danger float-right mx-1"
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
            <div class="modal-dialog modal-xl">
                <div class="modal-content">

                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">Editar informações do ambiente</h4>
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
            env: {
                layout:{},
                media:{},
                calls:[]
            },
            layouts:[
                {id:1,name:"com video", recentCalls:2, lastCalls:4},
                {id:2,name:"sem video", recentCalls:1, lastCalls:6},
                {id:3,name:"somente numero sem midia", recentCalls:1, lastCalls:0},
                {id:4,name:"somente numero com midia", recentCalls:1, lastCalls:0},
            ],
            mediaTypes:["image","video"],
            theme:{
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
          this.initEnv();
        },
        initEnv: function () {
          this.socket.emit("initEnv", this.myenv);
        },
        getEnv: function (env) {
          this.env = env
          console.log(this.env)
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
        },
        editAmbiente: function (env) {
          this.ambiente = env
        },
        copytoclipboard:function(text){
            navigator.clipboard.writeText(window.location.origin+"/#"+text)
        }
    },
    mounted() {
        this.initEnv();
        console.log(this.myenv)
        this.socket
            .on("createEnv", this.getEnvs)
            .on("updatecall", this.calling)
            .on("initEnv", this.getEnv);
    },
    created() {
        this.myenv = this.$route.params.env
        console.log(this.myenv)
    },
}
</script>