<template>
  
<div class="layoutContainer corfundo">
  <div class="rodape corfundo2 rodapeText px-2 rounded-2">
    <divs class="d-flex  align-items-center flex justify-content-between">
                    <div class="cortitulo1">{{envname}} </div>
                    <div class="cortitulo1 ">
                        <span ><i class="far fa-calendar-alt cortitulo3"></i>{{dataAtual}}</span>
                        <span ><i class="far fa-clock cortitulo3"></i>{{horaAtual}}</span>
                    </div>
                </divs>
  </div>
  <div class="ultimas-chamadas">
    <div class="p-3 m-3 d-flex" >
        <h2 class="align-self-center cortitulo3">Ultimas senhas</h2>
    </div>
    <div class="card p-3 m-3 corfundo2" :key="index" v-for="call,index in LastCalls" style="width: 20%;">
        <div class="card-body text-center">
            <h1 class="card-title cortitulo1">{{call.name}}</h1>
            <div class="card-text">
                <div class="alert corfundo3 cortitulo1">{{call.place.name}}</div>
            </div>
        </div>
    </div>
  </div>
  <div class="recentes">
    <h2 class="cortitulo3">Chamando agora</h2>
    <div class="d-flex flex-column ">
        <div class="card  mt-4 corfundo2" :key="index" v-for="call,index in RecentCalls" style="height:25vh;">
            <div class="card-body text-center recentCalls">
                <h1 class="card-title cortitulo1">{{call.name}}</h1>
                <div class="card-text">
                    <div class="alert corfundo3 cortitulo1">{{call.place.name}}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
  <div class="media">
    <iframe v-if="media.type=='video'" style="width: 100%; height: 100%;" autoplay muted :src="media.url" ></iframe>
    <img v-else style="width: 100%; height: 100%;" :src="media.url" />
  </div>
</div>
</template>

<script>
export default {
  name: 'LayoutWithMedia',
  props: {
    RecentCalls: Array,
    LastCalls: Array,
    envname: String,
    media: Object,
    theme:Object
  },
  data() {
    return {
      horaAtual: "",
      dataAtual: "",
    }
  },
  methods: {
        getDateTime: function () {
            let dataObj = new Date();

            let diaSemana = dataObj.toLocaleString('default', { weekday: 'long' });
            let data = dataObj.toLocaleDateString();
            let hora = dataObj.toLocaleTimeString("default", { hour: '2-digit', minute: '2-digit' })

            this.dataAtual = ` ${diaSemana} | ${data} `;
            this.horaAtual = `${hora.replace(":", "h")}`
        },
  }, 
  mounted() {
        this.getDateTime();
        setInterval(() => {
            this.getDateTime();
        }, 1000);
    },
}
</script>

<style scoped>

.layoutContainer {  
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 65% 30% 5%;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "media recentes"
    "ultimas-chamadas ultimas-chamadas"
    "rodape rodape";
  width: 100vw;
  height: 100vh;
  padding: 10px;
}

.rodape { 
  grid-area: rodape; 
}

.rodapeText{
  font-size: x-large;
}

.ultimas-chamadas {  
  grid-area: ultimas-chamadas;
  display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
}

.recentes { grid-area: recentes; }

.media { 
  grid-area: media; 
  padding: 10px;}

.recentCalls {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-evenly;
}

.corfundo{
  background: v-bind(theme.cor1 );
}
.cortitulo1{
  color: v-bind(theme.cor1 );
}

.corfundo2{
  background: v-bind(theme.cor2 );
}

.cortitulo2{
  color: v-bind(theme.cor2 );
}

.corfundo3{
  background: v-bind(theme.cor3 );
}

.cortitulo3{
  color: v-bind(theme.cor3 );
}

</style>
