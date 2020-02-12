//when the page loads the 'name' textfield is in focus
$('#name').focus();


//initially hides the job-role text field 
$('#other-title').hide();


//show the 'job-role text field only if the 'other' option is selected
for (var i = 0; i < $('#title').length; i++){
    $('#title')[i].addEventListener('change', (e) => {
        if(e.target.value === 'other'){
            $('#other-title').show();
        } else {
            $('#other-title').hide();
        }
    })
};

//hide the color options and make the color field read "please select a t-shirt theme" 
$('#color').prepend($('<option selected>').text('Please select a T-shirt theme'));
$('#color').children().hide();

$('#design :nth-child(1)').val('select theme');

// //show different color options depending on which theme is selected. The first color option is shown in the color field.
$('#design')[0].addEventListener('change', (e) => {
        if (e.target.value === 'select theme'){
            $('#color').children().hide();
            $('#color :nth-child(1)').prop('selected', 'selected').show();
        } else if(e.target.value === 'js puns'){
            $('#color').children().hide();
            $('#color :nth-child(2)').prop('selected', 'selected').show();
            $('#color :nth-child(3)').show();
            $('#color :nth-child(4)').show();
            } else if (e.target.value === 'heart js'){
                $('#color').children().hide();
                $('#color :nth-child(5)').prop('selected', 'selected').show();
                $('#color :nth-child(6)').show();
                $('#color :nth-child(7)').show();  
            } 
    });


//