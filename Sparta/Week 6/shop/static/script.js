$(document).ready(function() {
    exRate();
    orderlisting();
    // alert('Finished loading!')

    $('#item-order').submit(function(event) {
        event.preventDefault(); // Prevent form submission

        // Get form values
        var firstName = $('#firstName').val().trim();
        var lastName = $('#lastName').val().trim();
        var orderQuantity = $('#orderQuantity').val().trim();
        var address = $('#address').val().trim();
        var phoneNumber = $('#phoneNumber').val().trim();

        // Check if any field is empty
        var emptyFields = [];
        if (firstName === '') {
            emptyFields.push('First Name');
        }
        if (lastName === '') {
            emptyFields.push('Last Name');
        }
        if (orderQuantity === '') {
            emptyFields.push('Order Quantity');
        }
        if (address === '') {
            emptyFields.push('Address');
        }
        if (phoneNumber === '') {
            emptyFields.push('Phone Number');
        }

        // Show alert or navigation based on empty fields
        if (emptyFields.length === 0) {
            $.ajax({
                type: 'POST',
                url: '/order',
                data: {
                    'firstname_give': firstName,
                    'lastname_give': lastName,
                    'count_give': orderQuantity,
                    'address_give': address,
                    'phone_give': phoneNumber
                },
                success: function (response){
                    alert(response['msg'])
                    window.location.reload();
                }
            });
            //alert('Your order has been placed!');
        }
    });
});

function exRate(){
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
}


function orderlisting() {
    $('#orders-box').empty()
    $.ajax({
        type: 'GET',
        url: '/order',
        data: {},
        success: function (response){
            let orders = response['orders']
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];

                let temp_html = `
                <tr>\
                    <td>${order['firstname']}</td>
                    <td>${order['lastname']}</td>
                    <td>${order['count']}</td>
                    <td>${order['address']}</td>
                    <td>${order['phone']}</td>
                </tr>
                `
                $('#orders-box').append(temp_html)
            }
        }
    })
}
