$(document).ready(function() {
    // Load existing notes on page load
    loadNotes();

    // Submit form to add a new note
    $('#noteForm').submit(function(event) {
        event.preventDefault();
        var noteTitle = $('#noteTitle').val().trim();
        var noteText = $('#noteText').val().trim();
        if(noteText === ""){
            alert('Note is empty!')
        }
        else{
            if(noteTitle === ""){
                noteTitle = "Untitled"
            }
            addNote(noteTitle, noteText);
        }
    });

    // Function to load existing notes
    function loadNotes() {
        $.ajax({
            url: '/notes',
            type: 'GET',
            success: function(data) {
                $('#noteList').empty();
                data.forEach(function(note) {
                    temp_html = `
                    <li class="list-group-item">
                    <h3>${note.title}</h3> 
                    <p>${note.text}</p>
                    </li>
                    `
                    $('#noteList').append(temp_html);
                });
            }
        });
    }

    // Function to add a new note
    function addNote(title, text) {
        $.ajax({
            url: '/notes',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({title: title, text: text}),
            success: function() {
                $('#noteText').val('');
                loadNotes();
            }
        });
    }
});
