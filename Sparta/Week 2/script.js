$(document).ready(function() {
    $.ajax({
        url: 'https://api.manana.kr/exchange/rate.json?base=INR&code=INR,USD',
        type: 'GET',
        success: function(data) {
            // Extract the exchange rate value from the response
            var exchangeRate = data[1].rate;
            // Update the DOM with the exchange rate
            $('.exchange-rate').text(`USD/INR Exchange Rate: ${exchangeRate.toFixed(2)}`);
        },
        error: function() {
            console.error('Error fetching exchange rate data!');
        }
    });
    alert('Finished loading!')

    $('#item-order').submit(function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        var firstName = $('#firstName').val().trim();
        var lastName = $('#lastName').val().trim();
        var address = $('#address').val().trim();
        var orderQuantity = $('#orderQuantity').val().trim();
        var phoneNumber = $('#phoneNumber').val().trim();

        // Check if any field is empty
        var emptyFields = [];
        if (firstName === '') {
            emptyFields.push('First Name');
        }
        if (lastName === '') {
            emptyFields.push('Last Name');
        }
        if (address === '') {
            emptyFields.push('Address');
        }
        if (orderQuantity === '-- Please Select Quantity --') {
            emptyFields.push('Order Quantity');
        }
        if (phoneNumber === '') {
            emptyFields.push('Phone Number');
        }

        // Show alert or navigation based on empty fields
        if (emptyFields.length > 0) {
            alert('Please fill in the following fields: ' + emptyFields.join(', '));
        } else {
            alert('Your order has been placed!');
        }
    });
});
