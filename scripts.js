// Map Center (Norway)
const centerLat = 60.472;
const centerLong = 8.468;

// Array of places with map data
const places = [
  { name: "Kontoret i Fredrikstad", lat: 59.2128, long: 10.9309, image: "images/pristina.png", type: "football", zoomLevel: 16 },
  { name: "Kontoret på remmen", lat: 59.1292, long: 11.3528, image: "pictures/martinhi.jpg", type: "volleyball", zoomLevel: 15 },
  { name: "Kristiansand LSU", lat: 58.1638, long: 8.0030, image: "images/kvik_halden.png", type: "football", zoomLevel: 16 },
  { name: "Trondheim representant for Hiøf", lat: 63.4195, long: 10.4020, image: "images/idd.png", type: "football", zoomLevel: 15 },
  { name: "Drammen NSO konferanse", lat: 59.7438, long: 10.1936, image: "images/aremark.png", type: "football", zoomLevel: 15 },
];

// Initialize the map
let map = L.map("map", {
  center: [centerLat, centerLong],
  zoom: 5,
  scrollWheelZoom: false,
});

// Set map tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Icons for map markers
const footballIcon = L.icon({
  iconUrl: "pictures/ektemartin.jpg",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

const volleyballIcon = L.icon({
  iconUrl: "pictures/ektemartin.jpg",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20],
});

// Generate HTML for navigation and add map markers
let navHTML = "";
places.forEach((place) => {
  const icon = place.type === "football" ? footballIcon : volleyballIcon;
  L.marker([place.lat, place.long], { icon: icon })
    .addTo(map)
    .bindPopup(`
      <div>
        <h3>${place.name}</h3>
        <img src="${place.image}" alt="${place.name} logo" style="width:100px; height:auto;"/>
      </div>
    `);
  navHTML += `
    <article>
      <h3>${place.name}</h3>
      <button onclick="map.flyTo([${place.lat}, ${place.long}], ${place.zoomLevel})">Vis på kart</button>
    </article>
  `;
});

// Event listeners for sidebar and map functionality
document.addEventListener("DOMContentLoaded", function () {
  // Insert navigation HTML
  const navContainer = document.getElementById("klubbkart");
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }

  // Sidebar toggle elements
  const chapterToggles = document.querySelectorAll(".chapter-toggle");
  const openMenuButton = document.getElementById("open-menu");
  const closeMenuButton = document.getElementById("close-menu");
  const navbar = document.getElementById("navbar");

  // Toggle visibility of subchapters
  chapterToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      this.classList.toggle("active");
      const subChapter = this.nextElementSibling;
      if (subChapter) subChapter.classList.toggle("active");
    });
  });

  // Open and close sidebar functionality
  if (openMenuButton && closeMenuButton && navbar) {
    openMenuButton.addEventListener("click", function () {
      navbar.classList.add("open");
      openMenuButton.classList.add("hidden");
    });

    closeMenuButton.addEventListener("click", function () {
      navbar.classList.remove("open");
      openMenuButton.classList.remove("hidden");
    });
  }

  // Additional sidebar elements
  const toggleButtons = document.querySelectorAll(".unique-toggle");
  const uniqueOpenButton = document.getElementById("unique-open");
  const uniqueCloseButton = document.getElementById("unique-close");
  const uniqueSidebar = document.getElementById("unique-navbar");

  if (uniqueOpenButton && uniqueCloseButton && uniqueSidebar) {
    toggleButtons.forEach((button) => {
      button.addEventListener("click", function () {
        this.classList.toggle("active");
        const subMenu = this.nextElementSibling;
        if (subMenu) subMenu.classList.toggle("active");
      });
    });

    uniqueOpenButton.addEventListener("click", function () {
      uniqueSidebar.classList.add("open");
      uniqueOpenButton.classList.add("hidden");
    });

    uniqueCloseButton.addEventListener("click", function () {
      uniqueSidebar.classList.remove("open");
      uniqueOpenButton.classList.remove("hidden");
    });
  }
});



am5.ready(function() {

  // Create root element
  var root = am5.Root.new("chartdiv");

  // Create chart
  var chart = root.container.children.push(am5percent.PieChart.new(root, {
    innerRadius: 80 // Makes it look like a donut chart
  }));

  // Create series
  var series = chart.series.push(am5percent.PieSeries.new(root, {
    valueField: "size",
    categoryField: "sector"
  }));

  // Set static data
  series.data.setAll([
    { sector: "Arbeid som studentleder", size: 60 },
    { sector: "Reisetid", size: 20 },
    { sector: "Fritid", size: 20 }
  ]);

  // Animate the initial load
  series.appear(1000, 100);

}); // end am5.ready()


const ctx = document.getElementById('gradeChart').getContext('2d');

// Original data for animation
const originalData = [9, 3, 1, 0, 2, 0];

// Initialize the chart variable globally so it can be updated
let gradeChart;

// Function to create the chart
function createChart() {
    gradeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E', 'Stryk'],
            datasets: [{
                label: 'Antall Studenter',
                data: originalData, // Set initial data
                backgroundColor: 'green'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false 
                },
                tooltip: {
                    enabled: false
                },
                datalabels: {
                    color: 'black',
                    font: {
                        size: 14,
                        weight: 'bold'
                    },
                    anchor: 'end',
                    align: 'start',
                    offset: -18,
                    formatter: (value) => value.toString()
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        stepSize: 1
                    }
                }
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutBounce'
            }
        },
        plugins: [ChartDataLabels]
    });

    // Start the animation cycle
    setTimeout(animateDown, 5000);
}

// Function to animate bars down to zero
function animateDown() {
    gradeChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0]; // Set data to zero
    gradeChart.update({
        duration: 1500,
        easing: 'easeInOutBounce'
    });

    // Wait for the animation to finish, then animate up
    setTimeout(animateUp, 2000); // Adjust this delay as needed for smoother transitions
}

// Function to animate bars back up to original values
function animateUp() {
    gradeChart.data.datasets[0].data = originalData; // Restore original data
    gradeChart.update({
        duration: 1500,
        easing: 'easeInOutBounce'
    });

    // Wait for the animation to finish, then animate down
    setTimeout(animateDown, 5000); // Adjust this delay as needed for smoother transitions
}

// Create the chart initially
createChart();



// Hide the loader after 4 seconds
setTimeout(() => {
  document.querySelector('.loader').classList.add('hidden');
}, 4000);

