
$(document).ready(function () {
  var address = window.location.href;
  if (address.indexOf("index.html") !== -1) {
    queryTableData();
  }

  if (address.indexOf("register.html") !== -1) {
    $('#registerEgg').submit(e => {
      e.preventDefault()
      if (validateFormData(e)) {
        let egg = queryFormData();
        egg.id = getDBLength();
        createEgg(egg)
      }
    });
  }

  if (address.indexOf("edit.html") !== -1) {
    var id = getIdFromUrl();
    var egg = getEgg(id);
    createEditForm(egg, id);

    $('#editEgg').submit(e => {
      e.preventDefault()
      if (validateFormData(e)) {
        let egg = queryFormData();
        egg.id = id;
        editEgg(egg)
      }
    });
  }
})

//Register functions.

function queryFormData() {
  let egg = {
    name: $('#name').val(),
    birthday: $('#birthday').val(),
    languages: $('input[name="languages[]"]:checked').map(function () { return $(this).val(); }).get(),
    parent: $('#parentSelect').val(),
    second_parent: $('#secondParentSelect').val()
  }
  return egg;
}

function validateFormData(data) {
  let selectedParent = $('#parentSelect');
  let selectedLanguage = $('input[name="languages[]"]');
  let checked = false;

  for (language of selectedLanguage) {
    if (language.checked) {
      checked = true;
      break;
    }
  }

  if (!checked) {
    console.log("At least one language must be selected.")
    return false;
  } else if (
    selectedParent === "" ||
    selectedParent === null
  ) {
    console.log("Select a parent.")
    return false;
  } else {
    return true;
  }
}


//Edit functions.
function createEditForm(egg, id) {
  $('#eggId').val(id);
  $('#name').val(egg.name);
  $('#birthday').val(egg.birthday);
  egg.languages.forEach(function (language) {
    $('input[name="languages[]"][value="' + language + '"]').prop('checked', true);
  });
  $('#parentSelect').val(egg.parent);
  $('#secondParentSelect').val(egg.second_parent);
}

//Table functions.
function queryTableData() {
  let eggs = getEggs();
  eggs.forEach(egg => {
    createTable(egg);
  });
}

function createTable(egg) {
  var name = egg.name;
  var birthday = egg.birthday;
  var languages = egg.languages;
  var parent = egg.parent;
  var secondParent = egg.second_parent;
  var editButton = $('<button class="btn btn-secondary" id="editButton"><img src="edit.png" alt="" srcset=""></button>');
  var deleteButton = $('<button class="btn btn-danger" id="deleteButton"><img src="delete.png" alt="" srcset=""></button>');

  $(editButton).click(e => {
    window.location.href = "./edit.html?id=" + egg.id;
  })
  $(deleteButton).click(e => {
    console.log("Delete button clicked.")
  })


  var tableBody = document.getElementById("tableBody");
  var newRow = tableBody.insertRow(tableBody.rows.length);

  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);
  var cell5 = newRow.insertCell(4);
  var cell6 = newRow.insertCell(5);

  cell1.innerHTML = name;
  cell2.innerHTML = birthday;
  cell3.innerHTML = languages.join(", ");
  cell4.innerHTML = parent;
  cell5.innerHTML = secondParent;
  $(cell6).append(editButton).append(deleteButton);
};

function getSelectedLanguages() {
  var selectedLanguages = [];
  var checkboxes = document.querySelectorAll('input[name="languages[]"]:checked');

  checkboxes.forEach(function (checkbox) {
    selectedLanguages.push(checkbox.value);
  });

  return selectedLanguages;
}

//Query functions.

function createEgg(egg) {
  if (egg.id != null) {
    try {
      localStorage.setItem(egg.id, JSON.stringify(egg));
      console.log("Succesfully added egg data!")
      return true;

    } catch (e) {
      console.log(e)
    }
    return false;
  }
}

function getEggs() {
  let eggs = [];
  try {
    for (let index = 0; index < localStorage.length; index++) {
      eggs.push(JSON.parse(localStorage.getItem(index)));
    }
    console.log(eggs);
    return eggs;
  } catch (e) {
    console.log(e);
  }
  return null;
}

function getEgg(id) {
  try {
    var egg = JSON.parse(localStorage.getItem(id));
    return egg;
  } catch (e) {
    console.log(e);
  }
  return null;
}

function getDBLength() {
  try {
    return localStorage.length;
  } catch (e) {
    console.log(e);
  }
  return null;
}

function editEgg(egg) {
  if (egg.id != null) {
    try {
      localStorage.setItem(egg.id, JSON.stringify(egg));
      console.log("Succesfully edited egg data!")
      return true;

    } catch (e) {
      console.log(e)
    }
    return false;
  }
}


function deleteEgg() {
}

function getIdFromUrl() {
  var id;
  var url = window.location.href;
  var partes = url.split('?');
  if (partes.length > 1) {
    var parametros = partes[1].split('&');
    for (var i = 0; i < parametros.length; i++) {
      var parametro = parametros[i].split('=');
      if (parametro[0] === 'id') {
        id = parametro[1];
      }
    }
  }
  return id;
}