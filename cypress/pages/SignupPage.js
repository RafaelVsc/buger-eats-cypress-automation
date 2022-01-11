


class SignupPage {
    go() {
        cy.visit('/')

        cy.get('a[href="/deliver"]').click()
        cy.get('div#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
    }

    fillForm(deliver) {
        cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)
        cy.get('input[type="button"][value="Buscar CEP"]').click()

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.get(`ul.delivery-method li img[alt="${deliver.delivery_method}"]`).click()
        // cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept="image/*"]').attachFile(`/images/${deliver.cnh}`)
    }

    submit() {
        cy.get('form button[type="submit"]').click()
    }

    modalContentShouldBe(expectedMessage) {
        // cy.get('div#swal2-html-container').should('have.text', 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.')
        cy.get('.swal2-container .swal2-html-container')
            .should('have.text', expectedMessage)
        cy.get('button.swal2-confirm').click()

        cy.get('#page-home main h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')

    }

    alertMessageShouldBe(expectedMessage) {
        // cy.get('span.alert-error').should('have.text', expectedMessage)
        cy.contains('.alert-error', expectedMessage).should('be.visible')

    }
}

export  default new SignupPage;