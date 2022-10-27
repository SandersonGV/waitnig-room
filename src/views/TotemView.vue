<template>
    <div class="container mt-5">
        <div class="card noprint">
            <div class="card-header">{{envName}} - Totem</div>

            <div class="card-body text-center">
                <h2>Escolha o tipo de atendimento</h2>
                <button :key="index" v-for="place,index in places" type="button" class="btn btn-primary btn-block"
                    @click="callTicket(place)">{{place.name}}</button>

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
              env: this.myenv
            });
          }
        },
        initTotem: function (data) {
          if (!this.myenv) {
            alert('ambiente indisponivel')
          }
          if (data) {
            this.envName = data.envName;
            this.places = data.places;
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
  
</style>