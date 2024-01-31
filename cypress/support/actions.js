import { selectors } from './selectors';

export const actions = {

    signUp: (username, password) => {
        cy.typeWithRetry(selectors.signUp.username, username);
        cy.typeWithRetry(selectors.signUp.password, password);
        cy.get(selectors.signUp.signUpButton, { timeout: 10000 }).should('be.visible').click();
    },
    logIn: (username, password) => {
        cy.typeWithRetry(selectors.logIn.username, username);
        cy.typeWithRetry(selectors.logIn.password, password);
        cy.get(selectors.logIn.logInButton, { timeout: 10000 }).should('be.visible').click();
    },
    logOut: () => {
        cy.get(selectors.logOut.logOutButton).click()
    },
    assertUserIsLoggedOut: () => {
        cy.get(selectors.logOut.logOutButton).should('not.be.visible');
    },
    navigateToPhoneCategory: () => {
        cy.get(selectors.phoneCategory.category).click();
    },

    selectSamsungGalaxyS6: () => {
        cy.get(selectors.phone.samsungGalaxyS6Link).first().click();
    },

    assertPhoneDetailsPage: () => {
        cy.get(selectors.phoneProductPage.phoneName).should('be.visible');
        cy.get(selectors.phoneProductPage.phonePrice).should('be.visible');
        cy.get(selectors.phoneProductPage.phoneInfo).should('be.visible');
        cy.get(selectors.phoneProductPage.phoneAddToCartBtn).should('be.visible');
        cy.get(selectors.phoneProductPage.phoneImage).should('be.visible');
    },

    addProductToCart: () => {
        cy.get(selectors.phoneProductPage.phoneAddToCartBtn).click();
    },

    addLaptopToCart: () => {
        cy.get(selectors.laptopProductPage.laptopAddToCart).click();
    },
    navigatoToLaptopCategory: () => {
        cy.get(selectors.laptopCategory.category).click();
    },

    selectSonyVaioI5: () => {
        cy.get(selectors.laptop.sonyVaioI5Kink).first().click();
    },
    viewCart: () => {
        cy.get(selectors.cartButton.cartButton).click();
    },

    getCartTotal: () => {
        return cy.get(selectors.cartTotalPrice.cartTotal).invoke('text');
    },

    assertProductInCart: () => {
        cy.get(selectors.phoneInCart.productImage).should('be.visible');
        cy.get(selectors.phoneInCart.productName).should('contain', 'Samsung galaxy s6');
        cy.get(selectors.phoneInCart.productPrice).should('contain', '360');
        cy.get(selectors.phoneInCart.productDeleteButton).should('be.visible');
    },

    deleteProductFromCartIfExists: () => {
        // check if the delete button exists and is visible
        cy.get(selectors.phoneInCart.productDeleteButton).then(deleteButton => {
            if (deleteButton.is(':visible')) {
                cy.wrap(deleteButton).click();
            }
        });
    },

    goToPlaceOrder: () => {
        cy.get(selectors.goToPlaceOrder.goToPlaceOrderButton).click();
    },

    assertPlaceOrderOpens: () => {
        cy.get(selectors.placeOrderModal.placeOrderModal).should('be.visible');
    },

    closePlaceOrderModalWithClose: () => {
        cy.get(selectors.placeOrderForm.placeOrderClose).click();
    },

    closePlaceOrderModalWithXButton: () => {
        cy.get(selectors.placeOrderForm.placeOrderXButton).click();
    },

    assertPlaceOrderIsClosed: () => {
        cy.get(selectors.placeOrderModal.placeOrderModal).should('not.exist');

    },

    assertPlaceOrderFormDetailsVisible: () => {
        cy.get(selectors.placeOrderForm.placeOrderName).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderCountry).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderCity).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderCard).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderMonth).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderYear).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderPurchase).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderClose).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderTotal).should('be.visible');
        cy.get(selectors.placeOrderForm.placeOrderXButton).should('be.visible');
    },
    completePlaceOrderForm: (name, country, city, card, month, year) => {
        const typeOptions = { delay: 100 };

        cy.get(selectors.placeOrderForm.placeOrderName).should('be.visible').clear().type(name, typeOptions);
        cy.get(selectors.placeOrderForm.placeOrderCountry).should('be.visible').clear().type(country, typeOptions);
        cy.get(selectors.placeOrderForm.placeOrderCity).should('be.visible').clear().type(city, typeOptions);
        cy.get(selectors.placeOrderForm.placeOrderCard).should('be.visible').clear().type(card, typeOptions);
        cy.get(selectors.placeOrderForm.placeOrderMonth).should('be.visible').clear().type(month, typeOptions);
        cy.get(selectors.placeOrderForm.placeOrderYear).should('be.visible').clear().type(year, typeOptions);
    },


    purchaseOrder: () => {
        cy.get(selectors.placeOrderForm.placeOrderPurchase).click();
    },

    assertPurchaseConfirmation: () => {
        cy.get(selectors.purchaseConfirmation.confirmationModal).should('be.visible');
        cy.get(selectors.purchaseConfirmation.confirmationMessage).should('contain', 'Thank you for your purchase!');
    },

    closePurchaseConfirmation: () => {
        cy.get(selectors.purchaseConfirmation.confirmationCloseButton).click()
        cy.wait(1000);
    },

    assertCartIsEmpty: () => {
        cy.get('#tbodyid').children().should('have.length', 0);
    },

    assertProductsPersistAfterLogin: () => {
        actions.viewCart();
        // Assert that the Samsung Galaxy and Sony Vaio are in the cart
        cy.get(selectors.phoneInCart.productName).contains('Samsung galaxy s6').should('be.visible');
        cy.get(selectors.laptopInCart.productName).contains('Sony vaio i5').should('be.visible');
    },

    //daca nu merge poti sa o stergi. e in locul celei de jos
    typeWithRetry: function (selector, text, retries = 3) {
        let attempts = 0;
        const typeInField = () => {
            cy.get(selector, { timeout: 10000 }).should('be.visible').clear().type(text, { delay: 10 });
            cy.get(selector).should('have.value', text).then($el => {
                if ($el.val() !== text && attempts < retries) {
                    attempts++;
                    typeInField(); // retry typing
                }
            });
        };
        typeInField();
    },
};


export function generateRandomCredentials() {
    const randomString = Math.random().toString(36).substring(2, 15);
    return {
        username: `testUser_${randomString}`,
        password: `testPass_${randomString}`
    };
}

