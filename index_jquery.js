var currentRow;
var product = [];
var invoiceTable = $("#invoice_table");

$(document).ready(function () {
    formDiv = $('#update');
    invoiceTable = $('#invoice_table');
    tbody = $('#tbody');
    newRow = $('#addRow');
    formDiv.hide();
    $.get("data.json", function (data, status){
        product = data;
        createTable();
    });


    $("#editForm").submit(function(e){
        e.preventDefault();
        onUpdate();
    });
    $("#rowForm").submit(function(e){
        e.preventDefault();
        rowAdded();
    });
});

function onEdit(elem) {
    decolor();
    formDiv.show(1000);
    currentRow = $("#" + elem);
    currentRow.css("background-color", "yellow");
    formName = $("#name");
    formCategory=$("#category");
    formPrice=$("#price");
    rowIndex=currentRow.index();
    formName.val(product[rowIndex].name);
    formCategory.val(product[rowIndex].category);
    formPrice.val(product[rowIndex].price);
    newRow.hide(1000);
}

function onUpdate() {
    
    currentRow.css("background-color", "transparent");
    formDiv.hide(1000);
    var name = formName.val();
    var category = formCategory.val();
    var price = formPrice.val();
    currentRow.find("td").eq(1).text(name);
    currentRow.find("td").eq(2).text(category);
    currentRow.find("td").eq(3).text(price);
    product[rowIndex].name=name;
    product[rowIndex].category=category;
    product[rowIndex].price=parseInt(price);
    sum();
}

function onDelete(elem) {
    decolor();
    var current = $("#" + elem);
    var removeIndex=current.index();
    $("#" + elem).remove();
    product.splice(removeIndex,1);
    sum();
}

function onAdd() {
    newRow.show(1000);
    formDiv.hide(1000);
}

function rowAdded() {
    var inputAddName = $("#rowName");
    var inputAddCategory = $("#rowCategory");
    var inputAddPrice = $("#rowPrice"); 
    var editButton, deleteButton;
    var editButton = $("<button>").text("Edit");
    var deleteButton = $("<button>").text("Delete");
    var lengthRow = (invoiceTable.find("tr").length) - 1;
    var addClass = "row" + lengthRow;
    var itemName = inputAddName.val();
    var itemCategory = inputAddCategory.val();
    var itemPrice = inputAddPrice.val();
    var rowid = "row" + (lengthRow - 1);
    $tr = $("<tr>").append(
        $("<td>").text(lengthRow),
        $("<td>").text(itemName),

        $("<td>").text(itemCategory),
        $("<td>").text(itemPrice),
        $("<td>", {
            append: editButton,
            class: "row" + lengthRow,

        }).attr("onclick", "onEdit('" + addClass + "')"),

        $("<td>", {
            append: deleteButton,
            class: "del"
        }).attr("onclick", "onDelete('" + addClass + "')"),
    ).attr("id", "row" + lengthRow);
    var row = invoiceTable.find("tr").eq(lengthRow).before($tr);
    newRow.hide(1000);
    var productJson = {
        name: itemName,
        category: itemCategory,
        price: parseInt(itemPrice)
    }
    product.push(productJson);
    sum();
    inputAddName.val("");
    inputAddCategory.val("");
    inputAddPrice.val("");
}

function onAddCancel(){
    newRow.hide(1000);
}
function onCancel(){
    formDiv.hide(1000);
}

function createTable() {
    var editButton, $tr, deleteButton, addClass;
    $.each(product, function (i, item) {
        addClass = "row" + i;
        editButton = $("<button>").text("Edit");
        deleteButton = $("<button>").text("Delete");

        $tr = $("<tr>").append(
            $("<td>").text(i + 1),
            $("<td>", {
                text: item.name,
                class: "",
            }),
            $("<td>").text(item.category),
            $("<td>").text(item.price),
            $("<td>", {
                append: editButton
            }).attr("onclick", "onEdit('" + addClass + "')"),
            $("<td>", {
                append: deleteButton
            }).attr("onclick", "onDelete('" + addClass + "')"),
        ).attr("id", "row" + i).appendTo('#invoice_table');
    });
    $th = $("<tr>").append(
        $("<th>").text(""),
        $("<th>", {
            text: "Sum",
            class: colspan="2"
        }),
        $("<th>").text(""),
        $("<th>").text("").attr("id", "sum"),
        $("<th>").text(""),
        $("<th>").text("")
    ).appendTo('#invoice_table');
    sum();
}

function sum() {
    var sum=0;
    $.each(product, function (key, value) {
     sum = sum + value.price;        
    });
    $("#sum").html(sum);
    console.log(sum);
}

function decolor(){
    var lengthRow = (invoiceTable.find("tr").length) - 1;
    var row = invoiceTable.find("tr");
    for(i=0; i<lengthRow; i++){
        row.css("background-color", "transparent");
    }
}