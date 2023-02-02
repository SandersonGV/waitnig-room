<template>
    <div class="holder d-flex  justify-content-center">
    <div class="container ">
        <header class="text-center my-5 noprint">
            <h1 class="display-4">Escolha o tipo de atendimento</h1>
        </header>
        <div class="card noprint rounded border-0 shadow-sm position-relative">
            <div class="card-body">
              <div class="row text-center">
                <div class="d-grid gap-2">
                  <button class="btn btn-outline-primary " type="button" :key="index" v-for="place,index in places" @click="callTicket(place)">
                    <div class="text-start m-3 " > <i class="fas fa-receipt fa-3x"></i> <span class=" display-4">{{place.name}}</span></div>
                  </button>
                </div>
              </div>
            </div>
        </div>
        <div class="text-center canprint" >
          <hr>
          <h3>---- local ---- </h3>
          <h3>{{printTicket?.place ?printTicket.place.name:""}}</h3>
          <h1>{{`${printTicket.name}`}} </h1>
          <hr>
        </div>
    </div>
    </div>
</template>
<script>
import io from "socket.io-client"
export default {
    name: "TotemView",
    data(){return {
        socket: io("http://localhost:3000"),
        myenv: "",
        envName: "",
        places: [],
        printTicket:{}
      }},
      methods: {
        callTicket: function (place) {
          let id = place.id;
          let text = "";
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
        initTotem: function (data) {
          console.log(data)
          if (!this.myenv) {
            alert('ambiente indisponivel')
          }
          if (data) {
            this.envName = data.envName;
            this.places = data.places;
            console.log(data)
          }
        },
        getTotenConfig: function () {
          this.socket.emit("initTotem", this.myenv);
        },
        getPrintTicket: function(ticket){
          this.printTicket = ticket;
          setTimeout(() => {
            window.print()
          }, 200); 
        }
      },
      mounted() {
        this.socket.on("initTotem", this.initTotem);
        this.socket.on("print", this.getPrintTicket);
        this.getTotenConfig();
      },
    created() {
        this.myenv = this.$route.params.env
        console.log(this.myenv)
    },
}
</script>
<style>
@media print{
   .noprint{
       display:none;
   }
   .canprint{
      display: block;
   }
}
@media screen {
  .canprint{
       display:none;
   }
}

.btn-sq-lg {
  width: 150px !important;
  height: 150px !important;
}
  
</style>