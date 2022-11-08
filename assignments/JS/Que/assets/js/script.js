var timerId = -1;

let persons = [{name: 'Ashan', color: "#1337C9"}, {name: 'Chamara', color: 'red'}, {
    name: 'Ruwan',
    color: 'orange'
}];

$(function () {
    renderQueue();
    timerId = setInterval(renderQueue, 1000);
});

function renderQueue() {
    $('#container').empty();

    for (let i = 0; i < persons.length; i++) {
        $('#container').append(`<div style="background-color: ${persons[i].color}"><h1 style="font-weight: 600;">${persons[i].name}</h1></div>`);
    }

    persons.unshift(persons.pop());
}

$('#btnAddToQueue').on('click', function () {
    persons.push({name: $('#txtName').val(), color: $('#txtColor').val()});
});

$('#btnStart').on('click', function () {
    clearInterval(timerId);
    timerId = setInterval(renderQueue, 1000);
});

$('#btnStop').click(function () {
    clearInterval(timerId);
});

$('#btnClearFields').on('click', function () {
    $('#txtName').val('');
    $('#txtColor').val('');
});