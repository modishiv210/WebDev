document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form values
    var firstName = document.getElementById('first-name').value.trim();
    var lastName = document.getElementById('last-name').value.trim();
    var address = document.getElementById('address').value.trim();
    var orderQuantity = document.getElementById('quantity').value.trim();
    var phoneNumber = document.getElementById('phone-number').value.trim();
    
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
    if (orderQuantity === '') {
        emptyFields.push('Order Quantity');
    }
    if (phoneNumber === '') {
        emptyFields.push('Phone Number');
    }
    
    // Show alert or navigation based on empty fields
    if (emptyFields.length === 0) {
        alert('Your order has been placed!');
        // You can redirect the user to another page if needed
    }
});
