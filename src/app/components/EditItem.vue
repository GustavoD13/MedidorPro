<template>
  <div>
    <h1>Actualizar Cliente</h1>
    <div class="row">
      <div class="col-md-6 "></div>
      <div class="col-md-2 ">
        <router-link :to="{ name: 'DisplayItem' }" class="btn btn-success">
          Regresar
        </router-link>
      </div>
        <div class="col-md-2 ">
        <router-link :to="{ name: 'Medicion' }" class="btn btn-primary">
          Medicion
        </router-link>
      </div>
       <div class="col-md-2 ">
        <router-link :to="{ name: 'DisplayMedidor' }" class="btn btn-warning">
          Medidor
        </router-link>
      </div>

    </div>
    <form v-on:submit.prevent="updateItem">

      <div class="form-group">
        <label>Cliente</label>
        <input type="text" class="form-control" v-model="item.clienteId">
      </div>

      <div class="form-group">
        <label >Edificio</label>
        <input type="text" class="form-control" v-model="item.edificio">
      </div>

      <div class="form-group">
        <label>Direccion</label>
        <input type="text" class="form-control" v-model="item.direccion">
      </div>

      <div class="form-group">
        <label >Lectura</label>
        <input type="text" class="form-control" v-model="item.lectura">
      </div>

      <div class="form-group">
        <label >Fecha Instalacion</label>
        <input type="text" class="form-control" v-model="item.fechainstalacion">
      </div>
              
      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>





    </form>    
  </div>
</template>

<script>

export default{
  data(){
    return{
      item:{}
    }
  },

  created: function(){
    this.getItem();
  },

  methods: {
    getItem()
    {
      let uri = 'http://localhost:4000/items/edit/' + this.$route.params.id;
      this.axios.get(uri).then((response) => {
        this.item = response.data;
      });
    },

    updateItem()
    {
      let uri = 'http://localhost:4000/items/update/' + this.$route.params.id;
      this.axios.post(uri, this.item).then((response) => {
        this.$router.push({name: 'DisplayItem'});
      });
    }
  }
}
</script>
