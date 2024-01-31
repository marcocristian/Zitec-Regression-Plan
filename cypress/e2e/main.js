import { actions, generateRandomCredentials } from '../support/actions';
import { selectors } from '../support/selectors';

function verifyLogin() {
    cy.get(selectors.logInConfirmation.username, { timeout: 10000 }).should('contain', 'marcoTest');
}


describe('Regression Plan', () => {
    let credentials;

    before(() => {
        credentials = generateRandomCredentials();
        // Intercept the sign-up request
        cy.intercept('POST', '/signup').as('signUpRequest');
        // Trigger sign-up
        cy.visit('/');
        cy.get('#signin2').click();
        actions.signUp(credentials.username, credentials.password);
        // Wait for the sign-up process to complete
        cy.wait('@signUpRequest').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    beforeEach(() => {
        // Clear cookies and local storage before each test
        cy.clearCookies();
        cy.clearLocalStorage();

        // Intercept the login request
        cy.intercept('POST', 'https://api.demoblaze.com/login').as('apiLogin');
        // Visit the homepage and open the login modal
        cy.visit('/');
        cy.get('#login2', { timeout: 10000 }).should('be.visible').click();
        // Perform login
        actions.logIn(credentials.username, credentials.password);
        // Wait for the login request to complete and check the response
        cy.wait('@apiLogin').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        // Verify that the user is logged in by checking the username display
        cy.get(selectors.logInConfirmation.username, { timeout: 10000 }).should('contain', credentials.username);
    });


    it('Navigate to phone product page, assert details are showing', () => {
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.navigateToPhoneCategory();
        actions.selectSamsungGalaxyS6();
        actions.assertPhoneDetailsPage();
    });

    it('Add product to cart, assert product is added', () => {
        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart');
        cy.visit('/');
        actions.navigateToPhoneCategory();
        actions.selectSamsungGalaxyS6();
        actions.addProductToCart();
        cy.wait('@addToCart').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        actions.viewCart();
        actions.assertProductInCart();
    });


    it('Delete product from cart if exists, assert table is empty', () => {
        cy.intercept('POST', 'https://api.demoblaze.com/deleteitem').as('deleteItem');
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.viewCart();
        actions.deleteProductFromCartIfExists();
        cy.wait('@deleteItem').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        actions.assertCartIsEmpty();
    });

    it('Add product to cart', () => {
        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart');
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.navigateToPhoneCategory();
        actions.selectSamsungGalaxyS6();
        actions.addProductToCart();
        cy.wait('@addToCart').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it('Open Place Order Form and close with "close" button, assert form is closed', () => {
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.viewCart();
        actions.goToPlaceOrder();
        cy.wait(2000);
        actions.closePlaceOrderModalWithClose();
        actions.assertPlaceOrderIsClosed();
    });

    it('Open Place Order Form and close with "x" button, assert form is closed', () => {
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.viewCart();
        actions.goToPlaceOrder();
        cy.wait(2000);
        actions.closePlaceOrderModalWithXButton();
        actions.assertPlaceOrderIsClosed();
    });

    it('Open Place Order Form and assert product details', () => {
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.viewCart();
        actions.goToPlaceOrder();
        actions.assertPlaceOrderFormDetailsVisible();
    });

    it('Open Place Order Form, complete form, purchase product and assert purchase', () => {
        cy.intercept('POST', 'https://api.demoblaze.com/deletecart').as('deleteCart');
        cy.visit('/');
        cy.get(selectors.logOut.logOutButton).should('be.visible');
        actions.viewCart();
        actions.goToPlaceOrder();
        actions.completePlaceOrderForm('Marco Ariciu', 'Romania', 'Cluj', '9827465890123456', '17', '2027');
        actions.purchaseOrder();
        actions.assertPurchaseConfirmation();
        cy.wait('@deleteCart').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.eq('Item deleted.');
        });

    });


    it('Add phone and laptop to the cart, assert the cart total is updated', () => {
        let initialCartValue;
        // intercept the network request for adding products to cart
        cy.intercept('POST', 'https://api.demoblaze.com/addtocart').as('addToCart');
        // navigate to phone category and add phone to cart
        cy.visit('/');
        actions.navigateToPhoneCategory();
        actions.selectSamsungGalaxyS6();
        actions.addProductToCart();
        // wait for the network request to complete
        cy.wait('@addToCart').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        // assert phone is added and get initial cart value
        actions.viewCart();
        actions.assertProductInCart();
        actions.getCartTotal().then((total) => {
            initialCartValue = Number(total);
        });
        // navigate to laptop category and add laptop to cart
        cy.visit('/');
        actions.navigatoToLaptopCategory();
        actions.selectSonyVaioI5();
        actions.addLaptopToCart();
        // wait for the second add to cart network request to complete
        cy.wait('@addToCart').then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        // assert laptop is added and get updated cart value
        actions.viewCart();
        actions.assertProductInCart();
        actions.getCartTotal().then((updatedTotal) => {
            const updatedCartValue = Number(updatedTotal);
            expect(updatedCartValue).to.eq(initialCartValue + 790); // The price of the laptop
        });
    });

    it('Products remain in cart after logout and login', () => {
        actions.logOut();
        actions.assertUserIsLoggedOut();
        cy.get('#login2').should('be.visible');
        // Log back in
        cy.get('#login2').click();
        cy.get('#logInModal').should('be.visible');
        actions.logIn(credentials.username, credentials.password);
        // wait for the logout button to confirm that the user is logged in
        cy.get('#logout2').should('be.visible');
        // assert products are still in the cart
        actions.assertProductsPersistAfterLogin();
    });

    it('User logs out, aseert user is logged out', () => {
        cy.visit('/');
        actions.logOut();
        actions.assertUserIsLoggedOut();
    });
});
