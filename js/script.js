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

//hide the color drop down menu 
$('#colors-js-puns').hide();

//show different color options depending on which theme is selected. The first color option is shown in the color field. 
// If no t-shirt design is selected, the color options is hidden 
$('#design')[0].addEventListener('change', (e) => {
       if(e.target.value === 'js puns'){
            $('#colors-js-puns').show();
            $('#color').children().hide();
            $('#color :nth-child(2)').prop('selected', 'selected').show();
            $('#color :nth-child(3)').show();
            $('#color :nth-child(4)').show();
            } else if (e.target.value === 'heart js'){
                $('#colors-js-puns').show();
                $('#color').children().hide();
                $('#color :nth-child(5)').prop('selected', 'selected').show();
                $('#color :nth-child(6)').show();
                $('#color :nth-child(7)').show();  
            } else {
                    $('#colors-js-puns').hide();
            }
    });

//variable to store the total cost
let totalCost = 0;

//variable to display the total cost
const totalCostDiv = $('<div></div>');
$('.activities').append(totalCostDiv);

const activities = document.querySelectorAll("input[type='checkbox']");

//Eventlistener to calculate the total cost.
$('.activities')[0].addEventListener('change', (e) => {
    const dataCost = e.target.getAttribute('data-cost');
    if (e.target.checked){
        totalCost += parseInt(dataCost);
    } else {
        totalCost -= parseInt(dataCost);
    }
    totalCostDiv.text('Total $' + totalCost);

    //When an activity is checked, any activity that occurs at the same time and date is disabled.
    const dayAndTimeChecked = e.target.getAttribute('data-day-and-time');
    for (let i = 0; i < activities.length; i++){
        let activitiesDAT = activities[i].getAttribute('data-day-and-time');

        if (dayAndTimeChecked === activitiesDAT && e.target != activities[i]){
            if (e.target.checked){
            activities[i].disabled = true;
            } else {
            activities[i].disabled = false;    
            }
        }
    }   
});

//Hides the 'select payment method' and displaying the 'credit card' option
$('#payment').children('option[value="select method"]').hide();
$('#payment').val('credit card').prop('selected', 'selected');

//Hides the other payment options
$('#paypal').hide();
$('#bitcoin').hide();

//Views the selected payment option and hides the other
$('#payment')[0].addEventListener('change', (e) => {
    if (e.target.value === 'credit card'){
        $('#paypal').hide();
        $('#bitcoin').hide();
        $('#credit-card').show();
}   else if (e.target.value === 'paypal'){
        $('#bitcoin').hide();
        $('#credit-card').hide();
        $('#paypal').show();
}   else if (e.target.value === 'bitcoin'){
        $('#paypal').hide();
        $('#credit-card').hide();
        $('#bitcoin').show();
        
}
});

//name error message
const nameError = $('<div>Please enter your name</div>').css('color', 'red').hide();
$('#name').before(nameError);  

//email regex and error message
const emailRegex = /^[^@]+@[^@.]+\.[a-z]+$/;
const emailError = $('<div>Please enter a valid Email address</div>').css('color', 'red').hide();
$('#mail').before(emailError);



//activities error message
const activitiesError = $('<div>Please choose at least one activity</div>').css('color', 'red').hide();
$('.activities').after(activitiesError);

//credit card regex and error message
const ccRegex = /^[0-9]{13,16}$/;
const creditCardError = $('<div>Please enter a number that is between 13 and 16 digits long</div>').css('color', 'red').hide();
$('#cc-num').after(creditCardError);
//another error message in case the credit card field is left empty
const creditCardEmpty = $('<div>Field cannot be empty</div>').css('color', 'red').hide();
$('#cc-num').after(creditCardEmpty);

//zip code regex and error message
const zipRegex = /^[0-9]{5}$/;
const zipCodeError = $('<div>Please enter a valid zip code</div>').css('color', 'red').hide();
$('#zip').after(zipCodeError);

//cvv regex and error message
const cvvRegex = /^[0-9]{3}$/;
const cvvError = $('<div>Please enter a valid CVV</div>').css('color', 'red').hide();
$('#cvv').after(cvvError);


//function to test the email input
function realTimeErrorMail(){
    return /^[^@]+@[^@.]+\.[a-z]+$/.test($('#mail'));
}

//real time error message
const realTime = $('<span class="bubble">Please enter a valid e-mail address</span>').hide();
$('#mail').after(realTime);



$('#mail')[0].addEventListener('keyup', () => {
    if (emailRegex.test($('#mail').val()) === false && $('#mail') != ''){
        realTime.show();
    } else {
        realTime.hide();
    }
})


//when the register button is clicked - check if everything is correctly filled in. 
// If it's not - show error messages for the fields that need to be filled in correctly
$('button')[0].addEventListener('click', (e) => {
    //name validation
    if ($('#name').val() === ''){ 
        e.preventDefault();
        nameError.show();
    } else {
        nameError.hide();
    }

    //email validation
    if (emailRegex.test($('#mail').val()) === false){
        realTime.hide();
        emailError.show();
        e.preventDefault();
    } else {
        realTime.hide();
        emailError.hide();
    }

    //activities validation
    if (totalCost === 0){
        e.preventDefault();
        activitiesError.show();
    } else {
        activitiesError.hide();
    }

    //check to see if credit card is selected
    if ($('#credit-card').is(':visible')){

    //credit card validation
    if ($('#cc-num').val() === ''){
        e.preventDefault();
        creditCardEmpty.show();
    } else if ($('#cc-num').val() != '' && ccRegex.test($('#cc-num').val()) === false){
        e.preventDefault();
        creditCardError.show();
        creditCardEmpty.hide();
    } else {
        creditCardError.hide();
        creditCardEmpty.hide();
    } 

    //zip code validation
    if (zipRegex.test($('#zip').val()) === false){
        e.preventDefault();
        zipCodeError.show();
    } else {
        zipCodeError.hide();
    }

    //cvv validation
    if (cvvRegex.test($('#cvv').val()) === false){
        e.preventDefault();
        cvvError.show();
    } else {
        cvvError.hide();
    }
}});