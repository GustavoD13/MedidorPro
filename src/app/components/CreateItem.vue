<template>
  <div>
    <h1>Crear Cliente</h1>
    <form v-on:submit.prevent="addItem">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Cliente:</label>
            <input type="text" class="form-control" v-model="item.clienteId">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Edificio:</label>
            <input type="text" class="form-control col-md-6" v-model="item.edificio">
          </div>
        </div>
      </div>
       <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Direccion</label>
            <input type="text" class="form-control" v-model="item.direccion">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Lectura:</label>
            <input type="text" class="form-control col-md-6" v-model="item.lectura">
          </div>
        </div>
      </div>     
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Fecha Instalacion:</label>
            <input type="text" class="form-control col-md-6" v-model="item.fechainstalacion">
          </div>
        </div>
      </div>        
      <br />
      <div class="form-group">
        <button class="btn btn-primary">Add Item</button>
      </div>
    </form>
  </div>
</template>

<script>
  import toastr from 'toastr';

  export default {
    data(){
      return{
        item:{}
      }
    },
    methods: {
      addItem(){
        let uri = 'http://localhost:4000/items/add';
        this.axios.post(uri, this.item).then((response) => {
          console.log(response);
          toastr.success(response.data.item, 'Response');
          this.$router.replace({ name: 'DisplayItem'})
        });
      }
    }
  }
  </script>
