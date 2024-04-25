(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    var fetchData = async function () {
        try {
            const response = await $.get('http://localhost:3000/products');
            // Process the received data here
            displayProducts(response); // Call the function to display products
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Function to display products
    // Function to display products
var displayProducts = function (products) {
    var productsContainer = $('#tab-1 .row'); // Select the container where products will be inserted
    
    // Clear any existing products in the container
    productsContainer.empty();

    // Iterate through each product in the response
    products.forEach(function (product) {
        // Check if the product is already displayed (avoid duplicates)
        if (!productsContainer.find(`[data-product-id="${product.productId}"]`).length) {
            // Create HTML structure for each product
            var productHTML = `
                <div class="col-md-6 col-lg-4 col-xl-3">
                    <div class="rounded position-relative medsitee-item">
                        <div class="medsitee-img">
                            <img src="${product.images}" class="img-fluid w-100 rounded-top" alt="${product.name}">
                        </div>
                        <div class="text-white bg-secondary px-3 py-1 rounded position-absolute" style="top: 10px; left: 10px;">${product.category}</div>
                        <div class="p-4 border border-secondary border-top-0 rounded-bottom">
                            <h4>${product.name}</h4>
                            <p>${product.description}</p>
                            <div class="d-flex justify-content-between flex-lg-wrap">
                                <p class="text-dark fs-5 fw-bold mb-0">Rs. ${product.price.toFixed(2)}</p>
                                <a href="#" class="btn border border-secondary rounded-pill px-3 text-primary"><i class="fa fa-shopping-bag me-2 text-primary"></i> Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            // Append the product HTML to the container
            productsContainer.append(productHTML);
        }
        console.log(product.images)
    });
};


    fetchData();

    // Function to perform search
// Function to perform search
$(document).ready(function() {
    // Event listener for the search button click
    $('#search-icon-1').on('click', function() {
        performSearch($('#search-input').val());
    });

    // Event listener for pressing the Enter key in the search input field
    $('#search-input').keypress(function(event) {
        if (event.keyCode === 13) {
            performSearch($('#search-input').val());
        }
    });
    $('#submit-now').on('click', function() {
        performSearch($('#search-2').val());
    });

    // Event listener for pressing the Enter key in the search input field
    $('#search-2').keypress(function(event) {
        if (event.keyCode === 13) {
            performSearch($('#search-2').val());
        }
    });
});

// Function to perform search
var performSearch = async function(query) {
    try {
        const response = await $.get('http://localhost:3000/products');
        // Filter products based on search query using regex
        const filteredProducts = response.filter(product =>
            new RegExp(query, 'i').test(product.name) || new RegExp(query, 'i').test(product.description)
        );
        displayProducts(filteredProducts);
        // Close the modal
        $('#searchModal').modal('hide');
        // Scroll to the section where the search results are displayed with a faster animation
        $('html, body').animate({
            scrollTop: $('#tab-1').offset().top
        }, 50); // Adjust animation duration as needed
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



// Event listener for search input field
// $('#search-input').on('input', function () {
//     var query = $(this).val().trim(); // Get the value of the search input and trim whitespace
//     if (query.length > 0) {
//         // If search query is not empty, perform search
//         performSearch(query);
//     } else {
//         // If search query is empty, display all products
//         fetchData();
//     }
// });

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });









    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);

