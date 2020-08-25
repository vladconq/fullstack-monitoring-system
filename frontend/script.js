const map_with_backend = {
    'Диффузионное отделение': 'diffusion',
    'Выпарка': 'residue',
    'Вакуум-аппараты': 'vacuum',
    'Сатурация': 'saturation',
    'Фильтрация': 'filtration',
    'ЖСО': 'pulp'
}

$(document).ready(function () {
    $("nav > button").click(function () {
        $("#type_of_technological_section").val(this.innerHTML);
        $("nav > button").removeClass("active");
        $(this).addClass("active");
        getLimitations()
    });
});


document.getElementById('newLimitation').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.set("type_of_technological_section", map_with_backend[$("#type_of_technological_section").val()]);

    let [url, method, operation] = ['', '', document.getElementById("submit").innerText];
    if (operation === "Добавить") {
        url = 'https://rusagro-api.azurewebsites.net/api/limitation-create/';
        method = 'POST';
    } else if (operation === "Изменить") {
        url = 'https://rusagro-api.azurewebsites.net/api/limitation-update/' + $("#id_sautcom").val();
        method = 'PUT';

        document.getElementById("submit").innerText = "Добавить";
        $("#cancel").addClass("hide");

        document.getElementById("id_sautcom").removeAttribute('readonly')
    }

    fetch(url, {
        method: method,
        body: formData
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        getLimitations();
        resetForm();
    })
});

function getLimitations() {
    console.log('https://rusagro-api.azurewebsites.net/api/limitations-list/' + map_with_backend[$("#type_of_technological_section").val()])
    fetch('https://rusagro-api.azurewebsites.net/api/limitations-list/' + map_with_backend[$("#type_of_technological_section").val()])
        .then(function (response) {
            return response.json()
        })
        .then(function (limitations) {
            buildTable(limitations)
        })
}

function buildTable(limitations) {
    const table = document.getElementById('limitationsList').getElementsByTagName('tbody')[0];

    table.innerHTML = '';
    limitations.forEach(limitation => {
        const newRow = table.insertRow(table.length);
        cell1 = newRow.insertCell(0);
        cell2 = newRow.insertCell(1);
        cell3 = newRow.insertCell(2);
        cell4 = newRow.insertCell(3);
        cell5 = newRow.insertCell(4);
        cell6 = newRow.insertCell(5);
        cell7 = newRow.insertCell(6);
        cell8 = newRow.insertCell(7);
        cell9 = newRow.insertCell(8);
        cell1.innerHTML = limitation.id_sautcom;
        cell2.innerHTML = limitation.description;
        cell3.innerHTML = limitation.min_limit;
        cell4.innerHTML = limitation.max_limit;
        cell5.innerHTML = limitation.averaging;
        cell6.innerHTML = limitation.date_begin;
        cell7.innerHTML = limitation.date_end;
        cell8.innerHTML = '<a onClick="onEdit(this)"><i class="far fa-edit"></i></a>';
        cell9.innerHTML = '<a onClick="onDelete(this)"><i class="far fa-trash-alt"></i></a>';
        cell3.style.textAlign = "right";
        cell4.style.textAlign = "right";
        cell5.style.textAlign = "right";
        cell6.style.textAlign = "center";
        cell7.style.textAlign = "center";
        cell8.style.textAlign = "center";
        cell9.style.textAlign = "center";
    })
}

function resetForm() {
    document.getElementById("id_sautcom").value = "";
    document.getElementById("description").value = "";
    document.getElementById("min_limit").value = "";
    document.getElementById("max_limit").value = "";
    document.getElementById("averaging").value = "";
    $("input[type=date]").val("");
}

function onEdit(td) {
    $("#submit").text('Изменить');
    $("#cancel").removeClass("hide");

    document.getElementById("id_sautcom").value = td.parentElement.parentElement.cells[0].innerHTML;
    document.getElementById("description").value = td.parentElement.parentElement.cells[1].innerHTML;
    document.getElementById("min_limit").value = td.parentElement.parentElement.cells[2].innerHTML;
    document.getElementById("max_limit").value = td.parentElement.parentElement.cells[3].innerHTML;
    document.getElementById("averaging").value = td.parentElement.parentElement.cells[4].innerHTML;
    document.getElementById("date_begin").value = td.parentElement.parentElement.cells[5].innerHTML;
    document.getElementById("date_end").value = td.parentElement.parentElement.cells[6].innerHTML;

    document.getElementById("id_sautcom").setAttribute('readonly', 'true')
}

$("#cancel").click(function () {
    $("#submit").text('Добавить');
    console.log('asd')
    $("#submit").removeClass("hide");
    $("#change").addClass("hide");
    $("#cancel").addClass("hide");
    document.getElementById("id_sautcom").removeAttribute('readonly')
})


function onDelete(td) {
    const id_sautcom = td.parentElement.parentElement.cells[0].innerHTML;
    const url = 'https://rusagro-api.azurewebsites.net/api/limitation-delete/' + id_sautcom;

    fetch(url, {
        method: 'DELETE',
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        getLimitations()
    })
}

getLimitations();