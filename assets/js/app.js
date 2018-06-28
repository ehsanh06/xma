$(() => {
    let form = $('.App__form'),
        formMessages = $('#form-messages');

    // Form event listener
    $(form).on('submit', (e) => {
        e.preventDefault();

        // Serialize form data.
        let formData = $(form).serialize();

        // Submit form via AJAX
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })

        // On successful request
        .done((response) => {

            // Form message has the success class
            $(formMessages)
                .removeClass('error')
                .addClass('success')

                // Set message text
                .text(response);

            // Empty the form
            $('#name', '#email', '#number').val('');

        })
        .fail((data) => {

            // Form message has the error class
            $(formMessages)
                .removeClass('success')
                .addClass('error');
            
            // Set message text
            data.responseText !== '' ? $(formMessages).text(data.responseText) : $(formMessages).text('Oops! An error occured and your message could not be sent.');
        });
    });

    removeit();
});

// If viewport is 650px and below, remove desktop .App__main
// Simple workaround for bug of Mobile version form 
function removeit() {
    if ($(window).width() < 650) {
        $('body .App__main').remove();
    }
}

function downloadPDF() {
    setTimeout(() => {
        window.open("./assets/data/XMA_Factsheet.pdf", "_blank");
    }, 1500);
}
