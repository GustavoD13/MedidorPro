<template>


    <div>
         <h1 class="d-inline">Mediciones</h1>
 <div > 
<!-- File Drop Zone -->
       <div style="visibility:hidden; opacity:0" id="dropzone">
        <div id="textnode">Drop files to add data.</div>
      </div>

   <br>
   <br>
   <br>
</div>
    <div class="col-md-12" id="file-panel">

    <table class="table table-hover table-sm table-bordered">
      <thead>
        <tr>
          <td>Fecha Medicion </td>
          <td>Medidor</td>
          <td>Total Consumido </td>          
          <td>Consumo Mes Anterior </td>
          <td>Consumo Mes Actual </td>
          <td>Accion </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(uf,index) in uploadedFiles" v-bind:key="uf._id">
     
          <td>{{ uf.fechaMedicion }}</td>
          <td>{{ uf.nroMedidor }}</td>
          <td>{{ uf.totalConsumido }}</td>
          <td>{{ uf.consumoMesAnterior }}</td>
          <td>{{ uf.consumoMesActual }}</td>
          <td>
            <button class="btn btn-danger">
              Add
            </button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
  </div>

</template>

<style>

</style>

<script>
import * as d3 from "d3";
export default {
 
  data() {
   return {
      uploadedFiles: []
    };
  },
  methods: {
 
    uploadFiles: function(f) {
      var self = this;

      function loadFiles(file) {

        // Pull the file name and remove the ".txt" extension
        var name = file.name.substr(0, file.name.lastIndexOf(".txt")) || file.name;
        var reader = new FileReader();

        reader.onload = function(e) {
          
          var content = e.target.result;


          var dato = d3.csvParse(content, function(dt) {
            return dt
          });
             


         console.log("FechaMedicion = ", dato[0]['Meter No.:'].substr(10,9));
        console.log("NroMedidor = ", dato[5]['Meter No.:'].trimEnd().substr(-8));
        console.log("TotalConsumido = ", dato[6]['Meter No.:'].substr(92,4));
         console.log("ConsumidoMesAnterior = ", dato[10]['Meter No.:'].substr(92,4));
        console.log("ConsumoMes = ", +dato[6]['Meter No.:'].substr(92,4) - +dato[10]['Meter No.:'].substr(92,4));

           var fechaMedicion = dato[0]['Meter No.:'].substr(10,9);
         var nroMedidor = dato[5]['Meter No.:'].trimEnd().substr(-8);
        var totalConsumido =  dato[6]['Meter No.:'].substr(92,4);
         var consumoMesAnterior =  dato[10]['Meter No.:'].substr(92,4);
         var consumoMesActual =  +dato[6]['Meter No.:'].substr(92,4) - +dato[10]['Meter No.:'].substr(92,4);
    
        var datos = {
            fechaMedicion,
            nroMedidor,
            totalConsumido,
            consumoMesAnterior,
            consumoMesActual

        }

          self.uploadedFiles.unshift({
            fechaMedicion: datos.fechaMedicion,
            nroMedidor: datos.nroMedidor,
            totalConsumido: datos.totalConsumido,
            consumoMesAnterior: datos.consumoMesAnterior,
            consumoMesActual: datos.consumoMesActual, 
            fileName: datos.name
          });
          
         // var results = JSON.stringify(datos);

        };
        reader.readAsText(file, "UTF-8");
        

      }

      for (var i = 0; i < f.length; i++) {
        if (f[i].type !== "text/plain") {
          //if text file is not submitted alert and skip over it
          alert("Sorry, " + f[i].type + " is not an accepted file type.");
          continue;
        } else {
          if (this.uploadedFiles.length > 0) {
            if (
              !this.checkDuplicateFile(
                f[i].name.substr(0, f[i].name.lastIndexOf(".txt"))
              )
            ) {
             loadFiles(f[i]);
            }
          } else {
            loadFiles(f[i]);
          }
        }
      }
    },
    checkDuplicateFile: function(filename) {
      if (this.uploadedFiles.find(el => el.fileName === filename)) {
        alert("Archivo duplicado: " + filename);
        return true;
      } else {
        return false;
      }
    },
      addMedicion(){
        let uri = 'http://localhost:4000/medicion/add';
        console.log(this.index);
        this.axios.post(uri, this.uf).then((response) => {
          console.log(response);
          //toastr.success(response.data.item, 'Response');
         // this.$router.replace({ name: 'DisplayItem'})
        });
      }
  },
  mounted() {
      var self = this;
      window.addEventListener("dragenter", function (e) {
              document.querySelector("#dropzone").style.visibility = "";
              document.querySelector("#dropzone").style.opacity = 1;
              document.querySelector("#textnode").style.fontSize = "48px";
      });

      window.addEventListener("dragleave", function (e) {
          e.preventDefault();

              document.querySelector("#dropzone").style.visibility = "hidden";
              document.querySelector("#dropzone").style.opacity = 0;
              document.querySelector("#textnode").style.fontSize = "42px";
          
      });

      window.addEventListener("dragover", function (e) {
          e.preventDefault();
          document.querySelector("#dropzone").style.visibility = "";
          document.querySelector("#dropzone").style.opacity = 1;
          document.querySelector("#textnode").style.fontSize = "48px";
      });

      window.addEventListener("drop", function (e) {
          e.preventDefault();
          document.querySelector("#dropzone").style.visibility = "hidden";
          document.querySelector("#dropzone").style.opacity = 0;
          document.querySelector("#textnode").style.fontSize = "42px";
          
        var files = e.dataTransfer.files;
           self.uploadFiles(files);
        });
  }
}
</script>

<style>


#file-panel {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: auto;
}

.panel-body {
  height: auto;
}



div#dropzone {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    transition: visibility 175ms, opacity 175ms;
    display: table;
    text-shadow: 1px 1px 2px #000;
    color: #fff;
    background: rgba(0, 0, 0, 0.45);
    font: bold 42px Oswald, DejaVu Sans, Tahoma, sans-serif;
}
div#textnode {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    transition: font-size 175ms;
}
</style>
