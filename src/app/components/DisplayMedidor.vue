<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Medidores</h1>
        <router-link :to="{ name: 'EditMedidor' }" class="btn btn-primary float-right mt-2">
          Editar Medidores
        </router-link>
      </div>
    </div><br />

    <table class="table table-hover table-sm table-bordered">
      <thead>
        <tr>
          <td>Medidor</td>
          <td>Piso</td>
          <td>Depto</td>

        </tr>
      </thead>

      <tbody>
        <tr v-for="medidor in medidores" v-bind:key="medidor._id">
          <td>{{ medidor.medidorId }}</td>
          <td>{{ medidor.Piso }}</td>
          <td>{{ medidor.depto }}</td>
          <td>
            <button class="btn btn-danger" v-on:click="deleteMedidor(medidor._id)">
              borrar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      medidores: []
    }
  },

  created: function()
  {
    this.fetchMedidores();
  },

  methods: {
    fetchMedidores()
    {
      let uri = 'http://localhost:4000/Medidores';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      });
    },
    deleteMedidor(id)
    {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:4000/medidores/delete/'+id;
        this.items.splice(id, 1);
        this.axios.get(uri);
      }
    }
    
  }
}
</script>
