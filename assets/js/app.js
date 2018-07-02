$(() => {
    let form,
        formMessages = $('#form-messages'),
        formSuccess = false; 

    // If viewport is 650px and below, remove desktop .App__main
    // Simple workaround for bug of Mobile version form
    if ($(window).width() < 650) {
        $('body .desktop__form').remove();
        form = $('.mobile__form');
    } else {
        $('body .mobile__form').remove();
        form = $('.desktop__form');
    }

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

    $("button.form__submit").on('click', () => {

        let formDataFilled = $('#name').val().length > 0 && $('#email').val().length > 0 && $('#name').val().length > 0 && $('#number').val().length > 0 && $('#privacy').is(":checked")
        console.log("hit");
        console.log('formDataFilled-->'+formDataFilled)
        if (formDataFilled == true) {            
            formSuccess = true;
            setTimeout(() => {
                if (formSuccess === true) {
                    downloadPDF();
                }
            }, 1500);
        }
    });

});

function downloadPDF() {
    window.open("./assets/data/XMA_Factsheet.pdf", "_blank");
}