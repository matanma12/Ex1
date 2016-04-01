$(document).ready(function() {
    $('#form').submit(function(evt){
        var sErr = error;
        if(sErr){
            $('#title').set(sErr);
            alert('in');
        }
    });
});