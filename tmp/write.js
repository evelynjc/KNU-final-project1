function openModal(width, height, hypervisor, instance) {

    var top = $("#modal_back").height() / 2 - height / 2;

    var left = $("#modal_back").width() / 2 - width / 2;

    

    $('#modal').css("top", top);

    $('#modal').css("left", left);

    $('#modal').css("width", width);

    $('#modal').css("height", height);

    $('#modal_back').css("display", "block");

    

    $('#text1').val("5555555");

// 		document.getElementById('text1').value = "5555555";

    

}



function closeModal() {

    $('#modal_back').css("display", "none");

}