console.log("SwapWear Frontend Loaded Successfully");

// ===============================
// CLOTHING DATA
// ===============================

// Default items shown on the marketplace (includes "owner" so item-details page works)
const defaultClothingItems = [
    {
        id: 1,
        name: "Blue Denim Jacket",
        brand: "Levi's",
        category: "Jacket",
        size: "M",
        condition: "Excellent",
        location: "Delhi",
        value: 1800,
        image: "🧥",
        owner: "Rahul Sharma",
        description:
            "Classic blue denim jacket in excellent condition. Worn only a few times and well maintained. Perfect for casual and streetwear outfits."
    },
    {
        id: 2,
        name: "Black Hoodie",
        brand: "Puma",
        category: "Hoodie",
        size: "L",
        condition: "Good",
        location: "Mumbai",
        value: 1200,
        image: "🧥",
        owner: "Priya Mehta",
        description:
            "Comfortable black Puma hoodie in good condition. Soft fabric and perfect for everyday casual wear."
    },
    {
        id: 3,
        name: "White Casual Shirt",
        brand: "Allen Solly",
        category: "Shirt",
        size: "M",
        condition: "Like New",
        location: "Bangalore",
        value: 900,
        image: "👔",
        owner: "Amit Kumar",
        description:
            "Premium white casual shirt with minimal usage. Clean and well maintained, suitable for office or casual occasions."
    },
    {
        id: 4,
        name: "Women's Denim Jeans",
        brand: "Zara",
        category: "Jeans",
        size: "30",
        condition: "Excellent",
        location: "Jaipur",
        value: 1600,
        image: "👖",
        owner: "Sneha Verma",
        description:
            "Stylish Zara denim jeans in excellent condition. Comfortable fit with modern design."
    },
    {
        id: 5,
        name: "Adidas Running Shoes",
        brand: "Adidas",
        category: "Shoes",
        size: "UK 8",
        condition: "Good",
        location: "Lucknow",
        value: 2200,
        image: "👟",
        owner: "Vikram Singh",
        description:
            "Lightweight Adidas running shoes in good condition. Ideal for running, gym workouts and casual use."
    },
    {
        id: 6,
        name: "Winter Jacket",
        brand: "H&M",
        category: "Jacket",
        size: "L",
        condition: "Good",
        location: "Delhi",
        value: 1400,
        image: "🧥",
        owner: "Neha Kapoor",
        description:
            "Warm and comfortable winter jacket suitable for cold weather. Clean and properly maintained."
    }
];

// Load any items the user has added themselves (stored in localStorage)
const userAddedItems =
    JSON.parse(localStorage.getItem("swapWearItems")) || [];

// Single source of truth for all clothing items on the site
const clothingItems = [...defaultClothingItems, ...userAddedItems];


// ===============================
// MARKETPLACE LISTINGS (render cards)
// ===============================

const clothingList = document.getElementById("clothingList");

function displayClothingItems(items) {

    if (!clothingList) {
        return;
    }

    if (items.length === 0) {
        clothingList.innerHTML = `
            <p style="text-align:center;">
                No clothing items found.
            </p>
        `;
        return;
    }

    clothingList.innerHTML = items.map((item) => `
        <div class="card clothing-card"
             data-category="${item.category.toLowerCase()}"
             data-location="${item.location.toLowerCase()}"
             data-search="${(item.name + " " + item.brand + " " + item.location).toLowerCase()}">

            <div class="listing-image">
                ${item.image}
            </div>

            <h3>${item.name}</h3>

            <p><strong>Brand:</strong> ${item.brand}</p>

            <p><strong>Size:</strong> ${item.size}</p>

            <p><strong>Condition:</strong> ${item.condition}</p>

            <p>📍 ${item.location}</p>

            <div class="price">
                Estimated Value: ₹${item.value}
            </div>

            <a href="item-details.html?id=${item.id}" class="btn btn-small">
                View Details
            </a>

        </div>
    `).join("");
}

// Initial render on the marketplace page
if (clothingList) {
    displayClothingItems(clothingItems);
}


// ===============================
// MARKETPLACE FILTERS (search + category + location)
// ===============================

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const locationFilter = document.getElementById("locationFilter");
const noResults = document.getElementById("noResults");

function applyFilters() {

    const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const selectedCategory = categoryFilter
        ? categoryFilter.value.toLowerCase()
        : "all";

    const selectedLocation = locationFilter
        ? locationFilter.value.toLowerCase()
        : "all";

    const filteredItems = clothingItems.filter((item) => {

        const matchesSearch =
            item.name.toLowerCase().includes(searchValue) ||
            item.brand.toLowerCase().includes(searchValue) ||
            item.location.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "all" ||
            item.category.toLowerCase() === selectedCategory;

        const matchesLocation =
            selectedLocation === "all" ||
            item.location.toLowerCase() === selectedLocation;

        return matchesSearch && matchesCategory && matchesLocation;
    });

    displayClothingItems(filteredItems);

    if (noResults) {
        noResults.style.display =
            filteredItems.length === 0 ? "block" : "none";
    }
}

if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
}

if (categoryFilter) {
    categoryFilter.addEventListener("change", applyFilters);
}

if (locationFilter) {
    locationFilter.addEventListener("change", applyFilters);
}


// ===============================
// ITEM DETAILS PAGE
// ===============================

const itemDetails = document.getElementById("itemDetails");

if (itemDetails) {

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get("id"));

    const selectedItem = clothingItems.find(
        (item) => item.id === itemId
    );

    if (selectedItem) {

        itemDetails.innerHTML = `
            <div class="item-details-container">

                <div class="item-large-image">
                    ${selectedItem.image}
                </div>

                <div class="item-info">

                    <h1>${selectedItem.name}</h1>

                    <p><strong>Brand:</strong> ${selectedItem.brand}</p>

                    <p><strong>Category:</strong> ${selectedItem.category}</p>

                    <p><strong>Size:</strong> ${selectedItem.size}</p>

                    <p><strong>Condition:</strong> ${selectedItem.condition}</p>

                    <p><strong>Location:</strong> 📍 ${selectedItem.location}</p>

                    <div class="price">
                        Estimated Swap Value: ₹${selectedItem.value}
                    </div>

                    <p class="item-description">
                        ${selectedItem.description}
                    </p>

                    <div class="owner-box">
                        <h3>Item Owner</h3>
                        <p><strong>${selectedItem.owner || "Unknown"}</strong></p>
                        <p>📍 ${selectedItem.location}</p>
                    </div>

                    <div class="item-actions">
                        <a href="swap-request.html?id=${selectedItem.id}" class="btn">
                            Request a Swap 🔄
                        </a>
                        <a href="listings.html" class="btn btn-outline">
                            ← Back to Listings
                        </a>
                    </div>

                </div>

            </div>
        `;

    } else {

        itemDetails.innerHTML = `
            <div class="form-container">
                <h2>Item Not Found</h2>
                <p>The clothing item you are looking for does not exist.</p>
                <br>
                <a href="listings.html" class="btn">Back to Marketplace</a>
            </div>
        `;
    }
}


// ===============================
// SWAP REQUEST PAGE
// ===============================

const myClothes = [
    { id: 101, name: "Grey Cotton Hoodie", brand: "Nike", value: 1500, size: "M", image: "🧥" },
    { id: 102, name: "Blue Slim Fit Jeans", brand: "Levi's", value: 1700, size: "32", image: "👖" },
    { id: 103, name: "White Sneakers", brand: "Puma", value: 1300, size: "UK 8", image: "👟" }
];

const swapRequestContainer = document.getElementById("swapRequestContainer");

if (swapRequestContainer) {

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get("id"));

    const requestedItem = clothingItems.find(item => item.id === itemId);

    if (requestedItem) {

        swapRequestContainer.innerHTML = `
            <div class="swap-request-container">

                <div class="swap-items">

                    <div class="swap-item-card">
                        <h3>You Want</h3>
                        <div class="swap-item-image">${requestedItem.image}</div>
                        <h2>${requestedItem.name}</h2>
                        <p>${requestedItem.brand}</p>
                        <div class="swap-value">Value: ₹${requestedItem.value}</div>
                    </div>

                    <div class="swap-icon">🔄</div>

                    <div class="swap-item-card">
                        <h3>You Offer</h3>
                        <div class="swap-item-image" id="offeredItemImage">👕</div>
                        <h2 id="offeredItemName">Select Your Item</h2>
                        <p id="offeredItemBrand">Choose an item below</p>
                        <div class="swap-value" id="offeredItemValue">Value: ₹0</div>
                    </div>

                </div>

                <div class="swap-comparison" id="swapComparison">
                    <h3>Swap Value Comparison</h3>
                    <p>Select an item to see the comparison.</p>
                </div>

                <div class="swap-form">
                    <h2>Select an Item to Offer</h2>

                    <div class="form-group">
                        <label>Your Clothing Item</label>
                        <select id="myClothingSelect">
                            <option value="">-- Select Your Item --</option>
                            ${myClothes.map(item => `
                                <option value="${item.id}">
                                    ${item.name} - ₹${item.value}
                                </option>
                            `).join("")}
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Message for Owner</label>
                        <textarea id="swapMessage" rows="5"
                            placeholder="Hi! I would like to exchange my item with yours.">
                        </textarea>
                    </div>

                    <button id="sendSwapRequest" class="btn">
                        Send Swap Request 🔄
                    </button>

                </div>

            </div>
        `;

        const myClothingSelect = document.getElementById("myClothingSelect");
        const offeredItemImage = document.getElementById("offeredItemImage");
        const offeredItemName = document.getElementById("offeredItemName");
        const offeredItemBrand = document.getElementById("offeredItemBrand");
        const offeredItemValue = document.getElementById("offeredItemValue");
        const swapComparison = document.getElementById("swapComparison");

        myClothingSelect.addEventListener("change", function () {

            const selectedId = parseInt(this.value);
            const offeredItem = myClothes.find(item => item.id === selectedId);

            if (offeredItem) {

                offeredItemImage.textContent = offeredItem.image;
                offeredItemName.textContent = offeredItem.name;
                offeredItemBrand.textContent = offeredItem.brand;
                offeredItemValue.textContent = `Value: ₹${offeredItem.value}`;

                const difference = Math.abs(requestedItem.value - offeredItem.value);
                const percentage = (difference / requestedItem.value) * 100;

                let result = "";

                if (percentage <= 10) {
                    result = "✅ Fair Swap - Values are very close.";
                } else if (percentage <= 30) {
                    result = "⚠️ Reasonable Swap - Consider negotiation.";
                } else {
                    result = "❗ Large Value Difference - Negotiation recommended.";
                }

                swapComparison.innerHTML = `
                    <h3>Swap Value Comparison</h3>
                    <p>Requested Item: ₹${requestedItem.value}</p>
                    <p>Your Item: ₹${offeredItem.value}</p>
                    <p>Difference: ₹${difference}</p>
                    <strong>${result}</strong>
                `;
            }
        });

        document.getElementById("sendSwapRequest").addEventListener("click", function () {

            const selectedItemId = myClothingSelect.value;

            if (!selectedItemId) {
                alert("Please select an item to offer.");
                return;
            }

            alert("Swap request sent successfully! 🔄");

            // Later: Save request in database, redirect to dashboard
        });

    } else {

        swapRequestContainer.innerHTML = `
            <div class="form-container">
                <h2>Item Not Found</h2>
                <p>The requested clothing item could not be found.</p>
                <br>
                <a href="listings.html" class="btn">Back to Marketplace</a>
            </div>
        `;
    }
}


// ===============================
// NEGOTIATION CHAT
// ===============================

const messagesContainer = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendMessageButton = document.getElementById("sendMessage");

if (messagesContainer && messageInput && sendMessageButton) {

    function sendMessage() {

        const messageText = messageInput.value.trim();

        if (messageText === "") {
            return;
        }

        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "sent");
        newMessage.textContent = messageText;

        messagesContainer.appendChild(newMessage);

        messageInput.value = "";
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    sendMessageButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}


// ===============================
// CONFIRM SWAP AGREEMENT
// ===============================

const confirmSwapButton = document.getElementById("confirmSwap");

if (confirmSwapButton) {

    confirmSwapButton.addEventListener("click", function () {

        const confirmed = confirm("Are you sure you want to confirm this swap?");

        if (confirmed) {
            alert("Swap agreement confirmed successfully! 🎉");
            confirmSwapButton.textContent = "Swap Confirmed ✓";
            confirmSwapButton.disabled = true;
        }
    });
}


// ===============================
// DASHBOARD REQUEST ACTIONS
// ===============================

const acceptButtons = document.querySelectorAll(
    ".request-actions .btn:not(.btn-danger):not(.btn-outline)"
);

const rejectButtons = document.querySelectorAll(".request-actions .btn-danger");

acceptButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const confirmed = confirm("Do you want to accept this swap request?");

        if (confirmed) {
            alert("Swap request accepted! You can now continue the negotiation in chat.");
            window.location.href = "chat.html";
        }
    });
});

rejectButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const confirmed = confirm("Are you sure you want to reject this swap request?");

        if (confirmed) {
            const requestCard = button.closest(".request-card");
            requestCard.remove();
            alert("Swap request rejected successfully.");
        }
    });
});


// ===============================
// ADMIN PANEL FUNCTIONALITY
// ===============================

const removeListingButtons = document.querySelectorAll(".remove-listing");

removeListingButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const confirmed = confirm("Are you sure you want to remove this listing?");

        if (confirmed) {

            const row = button.closest("tr");
            row.remove();

            const tableRows = document.querySelectorAll("#adminListingTable tr");
            const totalListings = document.getElementById("totalListings");

            if (totalListings) {
                totalListings.textContent = tableRows.length;
            }

            alert("Listing removed successfully.");
        }
    });
});


// ===============================
// QUICK ACTION BUTTONS (Admin)
// ===============================

const viewReports = document.getElementById("viewReports");
const manageUsers = document.getElementById("manageUsers");
const platformAnalytics = document.getElementById("platformAnalytics");

if (viewReports) {
    viewReports.addEventListener("click", function () {
        alert("Reports feature will display reported listings and disputes.");
    });
}

if (manageUsers) {
    manageUsers.addEventListener("click", function () {
        alert("User management feature will be connected to the backend.");
    });
}

if (platformAnalytics) {
    platformAnalytics.addEventListener("click", function () {
        alert("Platform analytics will be available after backend integration.");
    });
}


// ===============================
// USER DASHBOARD - MY LISTINGS
// ===============================

const myListings = document.getElementById("myListings");
const noMyListings = document.getElementById("noMyListings");

function displayMyListings() {

    if (!myListings) {
        return;
    }

    const savedItems = JSON.parse(localStorage.getItem("swapWearItems")) || [];

    if (savedItems.length === 0) {

        myListings.innerHTML = "";

        if (noMyListings) {
            noMyListings.style.display = "block";
        }

        return;
    }

    if (noMyListings) {
        noMyListings.style.display = "none";
    }

    myListings.innerHTML = savedItems.map((item) => `
        <div class="card clothing-card">

            <div class="listing-image">
                ${item.image || "👕"}
            </div>

            <h3>${item.name}</h3>

            <p><strong>Brand:</strong> ${item.brand}</p>

            <p><strong>Size:</strong> ${item.size}</p>

            <p><strong>Condition:</strong> ${item.condition}</p>

            <p>📍 ${item.location}</p>

            <div class="price">
                Estimated Value: ₹${item.value}
            </div>

            <div class="listing-actions">
                <button class="btn edit-item" data-id="${item.id}">Edit</button>
                <button class="delete-item" data-id="${item.id}">Delete</button>
            </div>

        </div>
    `).join("");

    const deleteButtons = document.querySelectorAll(".delete-item");

    deleteButtons.forEach((button) => {

        button.addEventListener("click", function () {

            const itemId = Number(this.dataset.id);
            const confirmed = confirm("Are you sure you want to delete this listing?");

            if (!confirmed) {
                return;
            }

            const updatedItems = savedItems.filter((item) => item.id !== itemId);

            localStorage.setItem("swapWearItems", JSON.stringify(updatedItems));

            displayMyListings();

            alert("Listing deleted successfully.");
        });
    });

    const editButtons = document.querySelectorAll(".edit-item");

    editButtons.forEach((button) => {

        button.addEventListener("click", function () {
            const itemId = button.dataset.id;
            window.location.href = `edit-item.html?id=${itemId}`;
        });
    });
}

if (myListings) {
    displayMyListings();
}


// ===============================
// EDIT CLOTHING ITEM
// ===============================

const editItemForm = document.getElementById("editItemForm");

if (editItemForm) {

    const urlParams = new URLSearchParams(window.location.search);
    const itemId = Number(urlParams.get("id"));

    const savedItems = JSON.parse(localStorage.getItem("swapWearItems")) || [];

    const selectedItem = savedItems.find((item) => item.id === itemId);

    if (!selectedItem) {

        alert("Item not found!");
        window.location.href = "dashboard.html";

    } else {

        document.getElementById("editItemName").value = selectedItem.name;
        document.getElementById("editItemCategory").value = selectedItem.category;
        document.getElementById("editItemBrand").value = selectedItem.brand;
        document.getElementById("editItemSize").value = selectedItem.size;
        document.getElementById("editItemCondition").value = selectedItem.condition;
        document.getElementById("editItemValue").value = selectedItem.value;
        document.getElementById("editItemLocation").value = selectedItem.location;
        document.getElementById("editItemDescription").value = selectedItem.description;

        editItemForm.addEventListener("submit", function (event) {

            event.preventDefault();

            selectedItem.name = document.getElementById("editItemName").value;
            selectedItem.category = document.getElementById("editItemCategory").value;
            selectedItem.brand = document.getElementById("editItemBrand").value;
            selectedItem.size = document.getElementById("editItemSize").value;
            selectedItem.condition = document.getElementById("editItemCondition").value;
            selectedItem.value = Number(document.getElementById("editItemValue").value);
            selectedItem.location = document.getElementById("editItemLocation").value;
            selectedItem.description = document.getElementById("editItemDescription").value;

            localStorage.setItem("swapWearItems", JSON.stringify(savedItems));

            alert("Item updated successfully! 🎉");

            window.location.href = "dashboard.html";
        });
    }
}
// ===============================
// DYNAMIC SWAP REQUEST SYSTEM
// ===============================

const swapRequestForm =
    document.getElementById("swapRequestForm");

const myItemSelect =
    document.getElementById("myItemSelect");

const requestedItemInfo =
    document.getElementById("requestedItemInfo");


if (swapRequestForm) {

    // Get requested item ID from URL
    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const requestedItemId =
        Number(
            urlParams.get("id")
        );


    // Get user-added items
    const myItems =
        JSON.parse(
            localStorage.getItem("swapWearItems")
        ) || [];


    // Get all marketplace items
    const requestedItem =
        clothingItems.find(
            (item) =>
                item.id === requestedItemId
        );


    // Display requested item information
    if (
        requestedItem &&
        requestedItemInfo
    ) {

        requestedItemInfo.innerHTML = `
            <strong>
                You are requesting:
            </strong>

            ${requestedItem.name}
            by ${requestedItem.brand}

            <br>

            📍 ${requestedItem.location}

            <br>

            Estimated Value:
            ₹${requestedItem.value}
        `;

    }


    // Load user's items into dropdown
    if (myItemSelect) {

        myItems.forEach((item) => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                item.id;


            option.textContent =
                `${item.name} - ₹${item.value}`;


            myItemSelect.appendChild(
                option
            );

        });

    }


    // Submit swap request
    swapRequestForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const myItemId =
                Number(
                    myItemSelect.value
                );


            const myItem =
                myItems.find(
                    (item) =>
                        item.id === myItemId
                );


            // Get existing requests
            const swapRequests =
                JSON.parse(
                    localStorage.getItem(
                        "swapWearRequests"
                    )
                ) || [];


            // Create new request
            const newRequest = {

                id: Date.now(),

                requestedItemId:
                    requestedItemId,

                requestedItemName:
                    requestedItem
                        ? requestedItem.name
                        : "Unknown Item",

                requestedItemBrand:
                    requestedItem
                        ? requestedItem.brand
                        : "",

                requestedItemLocation:
                    requestedItem
                        ? requestedItem.location
                        : "",


                offeredItemId:
                    myItemId,

                offeredItemName:
                    myItem
                        ? myItem.name
                        : "Unknown Item",

                offeredItemBrand:
                    myItem
                        ? myItem.brand
                        : "",

                offeredItemValue:
                    myItem
                        ? myItem.value
                        : 0,


                message:
                    document
                        .getElementById(
                            "swapMessage"
                        )
                        .value,

                status:
                    "Pending",

                createdAt:
                    new Date()
                        .toLocaleString()

            };


            // Save request
            swapRequests.push(
                newRequest
            );


            localStorage.setItem(
                "swapWearRequests",
                JSON.stringify(
                    swapRequests
                )
            );


            alert(
                "Swap request sent successfully! 🎉"
            );


            // Redirect to dashboard
            window.location.href =
                "dashboard.html";

        }
    );

}