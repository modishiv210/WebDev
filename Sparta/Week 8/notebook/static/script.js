$(document).ready(function() {
    // Load existing notes on page load
    loadNotes();

    // Submit form to add a new note
    $('#noteForm').submit(function(event) {
        event.preventDefault();
        var noteTitle = $('#noteTitle').val().trim();
        var noteText = $('#noteText').val().trim();
        if (noteText === "") {
            alert('Note is empty!')
        } else {
            if (noteTitle === "") {
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
                    var noteItem = `
                        <li class="list-group-item" data-note-id="${note._id}">
                            <h3>${note.title}</h3> 
                            <p>${note.text}</p>
                            <button type="button" class="btn btn-primary edit-btn">Edit</button>
                            <button type="button" class="btn btn-danger delete-btn">Delete</button>
                        </li>`;
                    $('#noteList').append(noteItem);
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
            data: JSON.stringify({ title: title, text: text }),
            success: function() {
                $('#noteTitle').val('');
                $('#noteText').val('');
                loadNotes();
            }
        });
    }

    // Edit note
    $(document).on('click', '.edit-btn', function() {
        var noteItem = $(this).closest('.list-group-item');
        var noteId = noteItem.data('note-id');
        var noteTitle = noteItem.find('h3').text();
        var noteText = noteItem.find('p').text();

        var newTitle = prompt('Enter new title:', noteTitle);
        var newText = prompt('Enter new text:', noteText);

        if (newTitle !== null && newText !== null) {
            updateNote(noteId, newTitle, newText);
        }
    });

    // Delete note
    $(document).on('click', '.delete-btn', function() {
        var noteItem = $(this).closest('.list-group-item');
        var noteId = noteItem.data('note-id');
        var confirmDelete = confirm('Are you sure you want to delete this note?');

        if (confirmDelete) {
            deleteNote(noteId);
        }
    });

    // Function to update a note
    function updateNote(id, title, text) {
        $.ajax({
            url: '/notes?id=' + id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ title: title, text: text }),
            success: function() {
                loadNotes();
            }
        });
    }

    // Function to delete a note
    function deleteNote(id) {
        $.ajax({
            url: '/notes?id=' + id,
            type: 'DELETE',
            success: function() {
                loadNotes();
            }
        });
    }
});