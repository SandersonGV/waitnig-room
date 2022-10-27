<template>
<div class="layoutContainer">
  <div class="rodape">
    <divs class="d-flex  align-items-center flex justify-content-between">
                    <div class="">{{envname}} </div>
                    <div class="">
                        <span><i class="far fa-calendar-alt"></i> {{dataAtual}} </span>
                        <span><i class="far fa-clock"></i> {{horaAtual}} </span>
                    </div>
                </divs>
  </div>
  <div class="ultimas-chamadas">
    <div class="ultimas_chamadas_lista">
      <div class="card bg-light p-3 m-3 " :key="index" v-for="call,index in LastCalls" style="width: 20%;">
          <div class="card-body text-center">
              <h1 class="card-title">{{call.name}}</h1>
              <div class="card-text">
                  <div class="alert alert-secondary">{{call.place.name}}</div>
              </div>
          </div>
      </div>
    </div>
    <div class="ultimas_texto">
      <div class="p-3 m-3 d-flex" style="width: 10%;">
          <h2 class="align-self-center">Ultimas<br>senhas</h2>
      </div>
    </div>
  </div>
  <div class="recentes">
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
  <div class="media">
    <img style="width: 100%; height: 100%;" :src="envUrl" />
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
    envUrl: String,
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

            this.dataAtual = diaSemana + " | " + data;
            this.horaAtual = hora.replace(":", "h")
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

.rodape { grid-area: rodape; }

.ultimas-chamadas {  display: grid;
  grid-template-columns: 0.3fr 1.2fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    "ultimas_texto ultimas_chamadas_lista";
  grid-area: ultimas-chamadas;
}

.ultimas_chamadas_lista { grid-area: ultimas_chamadas_lista; }

.ultimas_texto { grid-area: ultimas_texto; }

.recentes { grid-area: recentes; }

.media { grid-area: media; padding: 10px;}

</style>
