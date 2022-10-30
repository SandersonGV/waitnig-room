<template>
  
<div class="layoutContainer corfundo">
  <div class="rodape corfundo2 rodapeText px-2 rounded-2 cortitulo1">
    
      <div class="cortitulo1"><h1>{{envname}}</h1> </div>
          <h2 ><i class="far fa-calendar-alt cortitulo3"></i>{{dataAtual}}</h2>
          <h2 ><i class="far fa-clock cortitulo3"></i>{{horaAtual}}</h2>
               
  </div>
  <div class="ultimas-chamadas">
      <h2 class="cortitulo3">Ultimas chamadas</h2>
      <div class="card corfundo2" :key="index" v-for="call,index in LastCalls" >
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
        <div class="card  mt-3 corfundo2" :key="index" v-for="call,index in RecentCalls" >
            <div class="card-body text-center recentCalls">
                <h1 class="card-title cortitulo1">{{call.name}}</h1>
                <div class="card-text">
                    <div class="alert corfundo3 cortitulo1">{{call.place.name}}</div>
                </div>
            </div>
        </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'LayoutWithOutMedia',
  props: {
    RecentCalls: Array,
    LastCalls: Array,
    envname: String,
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
    console.log(this.theme)
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
  grid-template-columns: 65% 35%;
  grid-template-rows: 65% 35%;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "recentes  ultimas-chamadas"
    "rodape ultimas-chamadas";
  width: 100vw;
  height: 100vh;
  padding: 10px;
}

.rodape { 
  grid-area: rodape; 
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.rodapeText{
  font-size: x-large;
}

.ultimas-chamadas {  
  grid-area: ultimas-chamadas;
  display: flex;
    flex-direction: column;
    align-items: stretch;
}

.ultimas-chamadas .card{  
  height: 14%;
  margin: 6px;
}


.ultimas-chamadas .card-title{
  font-size: 3vh;
}
.ultimas-chamadas .card-text{
  font-size: 2vh;
}

.recentes { grid-area: recentes; }

.recentCalls {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: space-evenly;
}

.recentes .card{
  height: 90%;
}

.recentes .card-title{
  font-size: 20vh;
}
.recentes .card-text{
  font-size: 8vh;
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
