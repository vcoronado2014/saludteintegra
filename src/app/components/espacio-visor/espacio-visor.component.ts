import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

declare var $: any;
import { ContratanteService } from '../../services/contratante.service';

@Component({
  selector: 'app-espacio-visor',
  templateUrl: './espacio-visor.component.html',
  styleUrls: ['./espacio-visor.component.css'],
  providers: [
      { provide: 'Window', useValue: window }
  ]
})
@Inject('Window')
export class EspacioVisorComponent implements OnInit {
    pacienteJson: any;
    usuarioJson: any;
    atencionJson: any;
    urlPdf: SafeResourceUrl;
    //doc: jsPDF();
    
    constructor( @Inject('Window') private window: Window,
        public sanitizer: DomSanitizer,
        private con: ContratanteService,
        private toastr: ToastsManager,
        private _vcr: ViewContainerRef

    ) {
        this.toastr.setRootViewContainerRef(_vcr);
        //let doc = new jsPDF('landscape', 'mm', 'a4', null);
        let doc = new jsPDF();

        //let doc = new jsPDF({
        //    orientation: 'landscape',
        //    unit: 'in',
        //    format: [4, 2]
        //})
        //var paciente = this.getParameterByName('paciente', null);
        this.urlPdf = sanitizer.bypassSecurityTrustResourceUrl('#');
        var paciente = this.getParameterByName('paciente', null);
        var usuario = this.getParameterByName('usuario', null);
        var atencion = this.getParameterByName('atencion', null);

        //json
        this.pacienteJson = JSON.parse(atob(paciente));
        this.usuarioJson = JSON.parse(atob(usuario));
        this.atencionJson = JSON.parse(atob(atencion));
        //listo para procesar, validar antes que los elementos no esten vacios
        this.CrearReporte(this.pacienteJson, this.usuarioJson, this.atencionJson, 'mostrar', doc);


    }
    insertarImpresion(ausId, ecolId, run, fechaAtencion) {
        this.con.putImpresion(ausId, run, ecolId, fechaAtencion).subscribe(
            data => {
                var respuesta = data.json();
                if (respuesta.Datos) {
                    //acá esta todo ok, no haremos nada ya que se guardo
                    console.log(respuesta.Datos);
                }
                else {
                    //levantar un modal que hubo un error
                    if (respuesta.Mensaje) {
                        this.showToast('error', respuesta.Mensaje.Texto, 'Error');
                    }
                    else {
                        this.showToast('error', 'Error al insertar impresión', 'Error');
                    }


                }

            },
            err => {
                this.showToast('error', err, 'Error');
                console.error(err);
            },
            () => console.log('creado con exito')
        );
    }

  ngOnInit() {
    }
  CrearReporte(dataPaciente, dataUsuario, dataAtencion, modo, doc) {
      moment.locale('es');
      var fechaActual = moment().format('MMMM Do YYYY, h:mm:ss a');
      var lineaInicio = 10;
      this.ConstruirEncabezadoPagina(dataUsuario.AutentificacionUsuario.NombreUsuario, fechaActual, lineaInicio, doc);
      this.ConstruirTitulo("Historia Clínica", lineaInicio + 10,  doc);
      this.ConstruirSubTitulo("Datos del Paciente", 30, doc);
      this.ConstruirDatosPaciente(dataPaciente, dataAtencion, 45, doc);
      this.ConstruirSubTitulo("Datos de la Atención", 79, doc);
      //89
      this.ConstruirDatosAtencion(dataAtencion, 89, doc);
      
      //seguimos en la 107

          //this.ConstruirEncabezado('Historia Clínica', dataPaciente.name, dataUsuario.EntidadContratante.RazonSocial, doc);
      //debajo deberiamos guardar la persistencia de la impresión

      if (modo == 'mostrar') {
          var data = doc.output('datauristring');
          this.urlPdf = this.sanitizer.bypassSecurityTrustResourceUrl(data);
          this.insertarImpresion(dataUsuario.AutentificacionUsuario.Id, dataUsuario.EntidadContratante.Id, dataPaciente.identification, dataAtencion.date);
      }
      else {
          doc.save('historia.pdf');
          this.insertarImpresion(dataUsuario.AutentificacionUsuario.Id, dataUsuario.EntidadContratante.Id, dataPaciente.identification, String(dataAtencion.date));
      }
    }
    //encabezado
   ConstruirEncabezado(titulo, subtitulo, institucion, doc) {
        //set color gray
        doc.setTextColor(0);
        doc.setFont("helvetica");
        doc.setFontType("bold");
        doc.text(20, 20, titulo);

        doc.setFont("helvetica");
        doc.setFontType("italic");
        doc.setFontSize("12");
        doc.text(10, 10, institucion);
        doc.text(20, 30, subtitulo);

        //linea
        doc.setLineWidth(0.5);
        doc.line(10, 35, 200, 35);

  }
   ConstruirTitulo(titulo, lineaInicio, doc) {
       //set color gray
       doc.setTextColor(0);
       doc.setFont("helvetica");
       doc.setFontType("bold");
       doc.setFontSize("14");
       doc.text(15, lineaInicio, titulo);

   }
   ConstruirSubTitulo(subtitulo, linea, doc) {
       //set color gray
       var otra = linea + 5;
       doc.setTextColor(0);
       doc.setFont("helvetica");
       doc.setFontType("bold");
       doc.setFontType("italic");
       doc.setFontSize("12");
       doc.text(20, linea, subtitulo);
       doc.setLineWidth(0.5);
       doc.line(20, otra, 200, otra);

   }
   ConstruirDatosPaciente(dataPaciente, dataAtencion, lineaInicio, doc) {
       //lo haremos cada 8 espacios en vez de 10
       doc.setTextColor(0);
       doc.setFont("helvetica");
       doc.setFontType("italic");
       doc.setFontSize("10");
       //comenzamos a escribir
       //numero atencion
       doc.setFontType("bold");
       doc.text(20, lineaInicio, "Numero Atención: ");
       doc.setFontType("normal");
       doc.text(55, lineaInicio, String(dataAtencion.id));
       //Run
       doc.setFontType("bold");
       doc.text(80, lineaInicio, "Run: ");
       doc.setFontType("normal");
       doc.text(90, lineaInicio, dataPaciente.identification);
       //servicio
       doc.setFontType("bold");
       doc.text(120, lineaInicio, "Servicio: ");
       doc.setFontType("normal");
       if (dataAtencion.service != '')
           doc.text(140, lineaInicio, dataAtencion.service);
       else
           doc.text(140, lineaInicio, 'No Ingresado');
       //nombre paciente
       doc.setFontType("bold");
       doc.text(20, lineaInicio + 8, "Nombre Paciente: ");
       doc.setFontType("normal");
       doc.text(55, lineaInicio + 8, dataPaciente.name);
       //medico informa
       doc.setFontType("bold");
       doc.text(110, lineaInicio + 8, "Médico Informa: ");
       doc.setFontType("normal");
       doc.text(145, lineaInicio + 8, dataAtencion.professional.name);
       //edad
       doc.setFontType("bold");
       doc.text(20, lineaInicio + 16, "Edad: ");
       doc.setFontType("normal");
       doc.text(55, lineaInicio + 16, dataPaciente.age);
       //nombre centro ? ojo no aparece en rayen
       doc.setFontType("bold");
       doc.text(110, lineaInicio + 16, "Centro: ");
       doc.setFontType("normal");
       doc.text(145, lineaInicio + 16, "");
       //sexo
       doc.setFontType("bold");
       doc.text(20, lineaInicio + 24, "Género: ");
       doc.setFontType("normal");
       if (dataPaciente.sex == 'f')
           doc.text(55, lineaInicio + 24, 'Femenino');
       else if (dataPaciente.sex == 'm')
           doc.text(55, lineaInicio + 24, 'Masculino');
       else
           doc.text(55, 24, 'No determinado');

   }
   ConstruirDatosAtencion(dataAtencion, lineaInicio, doc) {
       //partimos en la 89
       //fecha, tipo, estado
       //nombre paciente
       doc.setTextColor(0);
       doc.setFont("helvetica");
       doc.setFontSize("10");
       doc.setFontType("bold");
       doc.text(20, lineaInicio, "Fecha: ");
       doc.setFontType("normal");
       doc.text(55, lineaInicio, dataAtencion.date);
       //medico informa
       doc.setFontType("bold");
       doc.text(110, lineaInicio, "Tipo Consulta: ");
       doc.setFontType("normal");
       doc.text(145, lineaInicio, dataAtencion.type);
       this.ConstruirSubTitulo("Diagnóstico", lineaInicio + 10, doc);
       doc.setFontSize("10");
       //diagnostico principal
       doc.text(20, lineaInicio + 20, dataAtencion.primaryDiagnosis);
   }
   ConstruirEncabezadoPagina(nombreUsuario, fechaImpresion, lineaInicio, doc) {
       //set color gray
       doc.setTextColor(0);
       doc.setFont("helvetica");
       doc.setFontType("bold");
       doc.setFontType("italic");
       doc.setFontSize("9");
       doc.text(10, lineaInicio, nombreUsuario);

       doc.text(120, lineaInicio, fechaImpresion);

       //linea
       doc.setLineWidth(0.3);
       doc.line(10, lineaInicio + 5, 200, lineaInicio + 5);

   }
  getParameterByName(name, url) {

      //// query string: ?foo=lorem&bar=&baz
      //var foo = getParameterByName('foo'); // "lorem"
      //var bar = getParameterByName('bar'); // "" (present with empty value)
      //var baz = getParameterByName('baz'); // "" (present with no value)
      //var qux = getParameterByName('qux'); // null (absent)

      if (!url) {
          url = window.location.href;
      }
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  getBase64Image(img) {
      var canvas = document.createElement("canvas");
      console.log("image");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
  }
  showToast(tipo, mensaje, titulo) {
      if (tipo == 'success') {
          this.toastr.success(mensaje, titulo);
      }
      if (tipo == 'error') {
          this.toastr.error(mensaje, titulo);
      }
      if (tipo == 'info') {
          this.toastr.info(mensaje, titulo);
      }
      if (tipo == 'warning') {
          this.toastr.warning(mensaje, titulo);
      }

  }

    /*
    //https://stackblitz.com/edit/angular5-pdf?file=app%2Fapp.component.ts

  getBase64Image(img) {
      var canvas = document.createElement("canvas");
      console.log("image");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      return dataURL;
  }

  //var base64 = (document.getElementById("imageid"));
  download() {
      let doc = new jsPDF();
      for (var i = 0; i < this.images.length; i++) {
          let imageData = this.getBase64Image(document.getElementById('img' + i));
          console.log(imageData);
          doc.addImage(imageData, "JPG", 10, (i + 1) * 10, 180, 150);
          doc.addPage();
      }
      doc.save('Test.pdf');
  }
    */

}
