console.log("Sample Express Logistics loaded.");

let shipments = [];

document.addEventListener('DOMContentLoaded', function(){
    loadShipments();
    setupDarkModeToggle();
    updateNavigation();
});

function loadShipments(){
    fetch('data/shipments.json')
        .then(response => response.json())
        .then(data => {
            shipments = data;
            console.log('Shipments loaded:', shipments);
        })
        .catch(error => console.error('Error loading shipments:', error));
}

function showMessage(message){
    alert(message);
}

function searchShipment(){
    const searchInput = document.getElementById('trackingInput');
    if(!searchInput) return;

    const trackingNumber = searchInput.value.trim().toUpperCase();

    if(!trackingNumber){
        showMessage('Please enter a tracking number');
        return;
    }

    const results = shipments.filter(shipment => 
        shipment.trackingNumber.toUpperCase().includes(trackingNumber)
    );

    displayResults(results);
}

function displayResults(results){
    const resultsContainer = document.getElementById('shipmentResults');
    
    if(!resultsContainer) return;

    if(results.length === 0){
        resultsContainer.innerHTML = '<div class="no-results">No shipments found. Try another tracking number.</div>';
        return;
    }

    resultsContainer.innerHTML = results.map(shipment => `
        <div class="shipment-card">
            <h3>Tracking: ${shipment.trackingNumber}</h3>
            <div class="shipment-details">
                <div class="detail-item">
                    <label>Sender:</label>
                    <span>${shipment.sender}</span>
                </div>
                <div class="detail-item">
                    <label>Receiver:</label>
                    <span>${shipment.receiver}</span>
                </div>
                <div class="detail-item">
                    <label>Origin:</label>
                    <span>${shipment.origin}</span>
                </div>
                <div class="detail-item">
                    <label>Destination:</label>
                    <span>${shipment.destination}</span>
                </div>
                <div class="detail-item">
                    <label>Estimated Delivery:</label>
                    <span>${shipment.estimatedDelivery}</span>
                </div>
            </div>
            <span class="status ${shipment.status.toLowerCase().replace(' ', '-')}">${shipment.status}</span>
        </div>
    `).join('');
}

function setupDarkModeToggle(){
    const toggle = document.getElementById('darkModeToggle');
    if(toggle){
        toggle.addEventListener('click', toggleDarkMode);
        if(localStorage.getItem('darkMode') === 'true'){
            document.body.classList.add('dark-mode');
            toggle.textContent = '☀️ Light';
        }
    }
}

function toggleDarkMode(){
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    const toggle = document.getElementById('darkModeToggle');
    if(toggle){
        toggle.textContent = isDarkMode ? '☀️ Light' : '🌙 Dark';
    }
}

function updateNavigation(){
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if(href === currentPage || (currentPage === '' && href === 'index.html')){
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function(){
    const searchInput = document.getElementById('trackingInput');
    if(searchInput){
        searchInput.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                searchShipment();
            }
        });
    }

    const adminSearchInput = document.getElementById('adminSearchInput');
    if(adminSearchInput){
        adminSearchInput.addEventListener('keypress', function(event){
            if(event.key === 'Enter'){
                adminSearch();
            }
        });
    }
});