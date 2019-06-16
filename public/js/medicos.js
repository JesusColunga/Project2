// public/js/medicos.js

// Get references to page elements
var $medNombre = $("#med-nombre");
var $medCorreo = $("#med-correo");
var $medTelefono = $("#med-telefono");
var $medUsuario = $("#med-usuario");
var $medContrasena = $("#med-contrasena");
var $medCedula = $("#med-cedula");

var $submitBtn = $("#submit");
var $medList = $("#med-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveMed: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/medicos",
      data: JSON.stringify(example)
    });
  },
  getMed: function() {
    return $.ajax({
      url: "api/medicos",
      type: "GET"
    });
  },
  deleteMed: function(id) {
    return $.ajax({
      url: "api/medicos/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getMed().then(function(data) {
    var $registros = data.map(function(reg) {
      var $a = $("<a>")
        .text(reg.nombre)
        .attr("href", "/example/" + reg.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": reg.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($registros);
  });
};

// handleFormSubmit is called whenever we submit a new Medico
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var registro = {
    nombre: $medNombre.val().trim(),
    correo: $medCorreo.val().trim(),
    telefono: $medTelefono.val().trim(),
    usuario: $medUsuario.val().trim(),
    contrasena: $medContrasena.val().trim(),
    cedula: $medCedula.val().trim()
  };
/*
  if (!(registro.text && registro.description)) {
    alert("You must enter an example text and description!");
    return;
  }
*/
  API.saveExample(registro).then(function() {
    refreshExamples();
  });

  $medNombre.val("");
  $medCorreo.val("");
  medTelefono.val("");
  medUsuario.val("");
  medContrasena.val("");
  medCedula.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);
