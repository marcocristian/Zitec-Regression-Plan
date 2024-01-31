export const selectors = {

    signUp: {
        username: '#sign-username',
        password: '#sign-password',
        signUpButton: 'button[onclick="register()"]'
    },

    logIn: {
        username: '#loginusername',
        password: '#loginpassword',
        logInButton: 'button[onclick="logIn()"]',
    },

    logOut: {
        logOutButton: 'a[onclick="logOut()"]'
    },

    logInConfirmation: {
        username: '#nameofuser'
    },

    phoneCategory: {
        category: 'a[onclick="byCat(\'phone\')"]'
    },

    phone: {
        samsungGalaxyS6Link: 'a[href="prod.html?idp_=1"]'
    },

    phoneProductPage: {
        phoneName: '.name',
        phonePrice: ".price-container",
        phoneInfo: "#more-information",
        phoneAddToCartBtn: 'a[onclick="addToCart(1)"]',
        phoneImage: '.product-image'
    },

    laptopCategory: {
        category: 'a[onclick="byCat(\'notebook\')"]'
    },

    laptop: {
        sonyVaioI5Kink: 'a[href="prod.html?idp_=8"]'
    },

    laptopProductPage: {
        laptopAddToCart: 'a[onclick="addToCart(8)"]'
    },
    cartButton: {
        cartButton: '#cartur'
    },

    cartTotalPrice: {
        cartTotal: '#totalp'
    },
    phoneInCart: {
        productImage: 'table tbody tr td img',
        productName: 'table tbody tr td:nth-child(2)',
        productPrice: 'table tbody tr td:nth-child(3)',
        productDeleteButton: 'table tbody tr td a[onclick^="deleteItem"]'
    },

    laptopInCart: {
        productImage: 'table tbody tr td img',
        productName: 'table tbody tr td:nth-child(2)',
        productPrice: 'table tbody tr td:nth-child(3)',
        productDeleteButton: 'table tbody tr td a[onclick^="deleteItem"]'
    },

    goToPlaceOrder: {
        goToPlaceOrderButton: '.btn-success'

    },

    placeOrderModal: {
        placeOrderModal: '.modal-open'
    },

    placeOrderForm: {
        placeOrderName: '#name',
        placeOrderCountry: '#country',
        placeOrderCity: '#city',
        placeOrderCard: '#card',
        placeOrderMonth: '#month',
        placeOrderYear: '#year',
        placeOrderPurchase: 'button[onclick="purchaseOrder()"]',
        placeOrderTotal: '#totalm',
        placeOrderXButton: '#orderModal .modal-header .close',
        placeOrderClose: '#orderModal .modal-footer .btn-secondary',
    },

    purchaseConfirmation: {
        confirmationModal: '.sweet-alert',
        confirmationMessage: '.sweet-alert h2',
        confirmationCloseButton: '.confirm',
    },

    emptyCart: {
        //assuming that when the total heading is not present, then the cart is empty
        totalHeading: '#totalp'
    }

};