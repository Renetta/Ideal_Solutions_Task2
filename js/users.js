
const columnDefs = [
    { field: "name" },
    { field: "role" },
    { field: "status" },
    { field: "publisher" },
    { field: "last_login" }
];

// specify the data
const rowData = [];

// let the grid know which columns and what data to use
const gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    defaultColDef: {
        sortable: true,
        filter: true
    },
    rowSelection: 'multiple',
    animatedRows: true,
    onCellClicked: params => {
        console.log('cell was clicked', params)
    }
};

// setup the grid after the page has finished loading
// document.addEventListener('DOMContentLoaded', () => {
//     const gridDiv = document.querySelector('#usersGrid');
//     new agGrid.Grid(gridDiv, gridOptions);
// });

var tableData = document.getElementById("rowData");
var userTable = document.getElementById("userTable");
var nameTableID = document.getElementById("nameTableID");
var roleTableID = document.getElementById("roleTableID");
var publishTableID = document.getElementById("publishTableID");
var loginTableID = document.getElementById("loginTableID");

var statusList = {
    'Not Verified': 'alert-info',
    Active: 'alert-primary',
    Suspended: 'alert-warning',
    Blocked: 'alert-danger',
    Deleted: 'alert-dark',
    Deactivated: 'alert-dark'

};

var publish = {
    'Formula News': 'alert-success'
}

var userdata = [];
var selectedRows = userdata;

function getRowTableData(num) {
    if (userTable) {
        console.log(userTable.rows[num + 1]);
        var userId = userTable.rows[num + 1] && userTable.rows[num + 1].childNodes[6].innerHTML;
        selectedRows = userdata.filter((item) => item.id == userId);
        console.log(selectedRows);
        localStorage.setItem('rowData', JSON.stringify(selectedRows[0]));
        window.location.href = "./users-details.html";
    }
}

function getLoginDate(date) {
     return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
}

function getData() {
    let rowArr = [];
    fetch("./data.json", { mode: "no-cors" })
        .then(response => response.json())
        .then(data => {
            userdata = data.users;
            for (var i = 0; i < data.users.length; i++) {
                let date = new Date(data.users[i].last_login);
                loginTime = getLoginDate(date);
                let set = data.users[i].publisher == 'Formula News' ? 'Invited' : '';
                let publishData = data.users[i].publisher == 'Formula News' ? 'Formula News' : '-';
                rowArr += '<tr class="rowSel" onclick="getRowTableData('+i+')">' +
                    '<td class="p-3 ms-5"><img src="./assets/images/profile.jpeg" class="img-fluid rounded-5" width="30" height="20"></td>' +
                    '<td class="p-3"><span class="fw-bold">' + data.users[i].name + '</span><p class="color-grey">' + data.users[i].email + '</p>' +
                    '<p class="color-grey" hidden>' + data.users[i].id + '</p></td>' +
                    '<td class="p-3">' + data.users[i].role + '</td>' +
                    '<td class="p-3"><label class="form-check-label alert ' + statusList[data.users[i].status] + '">' + data.users[i].status + '<label></td>' +
                    '<td class="p-3">' + publishData +
                    '<label class="ms-2 form-check-label alert ' + publish[data.users[i].publisher] + '">' + set + '<label></td>' +
                    '<td class="p-3">' + loginTime + '</td><td hidden>'+data.users[i].id+'</td>' +
                    '</tr>';
            }
            if (tableData)
                tableData.innerHTML = rowArr;
        });


}

getData();

function getselectedUserData() {
    console.log('object', JSON.parse(localStorage.getItem('rowData')));
    let data = JSON.parse(localStorage.getItem('rowData'));
    var breadcrumbname = document.getElementById("breadcrumbname");
    var nickname = document.getElementById("nickname");
    var nickname2 = document.getElementById("nickname2");
    var location = document.getElementById("location");
    var useraname = document.getElementById("useraname");
    var email = document.getElementById("email");
    var logintime = document.getElementById("logintime");
    var writing = document.getElementById("writing");
    breadcrumbname.innerHTML = data.name;
    nickname.innerHTML = data.username;
    nickname2.innerHTML = data.username;
    location.innerHTML = data.address.street;
    useraname.innerHTML = data.name;
    email.innerHTML = data.email;
    logintime.innerHTML = getLoginDate(new Date(data.last_login));

    role = [];
    for(var i = 0; i < data.role.length; i++) {
        role += '<div class="col-md-2 mb-2 text-center">'+
        '<label for class="form-control filter-color" style="font-size: 10px">'+
        data.role[i]+
        '</label>'+
        '</div>';
    }
    console.log(role);

    writing.innerHTML = role;
    

}
window.onload = getselectedUserData;
// export {selectedRows}
