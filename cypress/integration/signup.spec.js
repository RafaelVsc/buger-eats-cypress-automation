import signup from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
import SignupPage from '../pages/SignupPage'

describe('Signup', () => {


    // before(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de TODOS os casos de teste')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado sempre ANTES de cada CASO de teste')
    // })


    // after(function() {
    //     cy.log('Tudo aqui é executado uma única vez DEPOIS de TODOS os casos de teste')
    // })

    // afterEach(function() {
    //     cy.log('Tudo aqui é executado sempre DEPOIS de cada CASO de teste')
    // })


    // usando o factory não é necessário o código comentado abaixo
    // beforeEach(function () {
    //     cy.fixture('deliver').then((d) => {
    //         this.deliver = d
    //     })
    // })



    it('User should be deliveryman', function () {

        let deliver = SignupFactory.deliver()



        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.modalContentShouldBe(expectedMessage)



    })

    it('Incorrect document', function () {

        let deliver = SignupFactory.deliver()

        deliver.cpf = '000000141aa'


        // const expectedMessage = 'Oops! CPF inválido'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')



    })


    it('Incorrect email', function () {

        let deliver = SignupFactory.deliver()

        deliver.email = 'user.com.br'


        // const expectedMessage = 'Oops! CPF inválido'

        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')



    })

    context('Required fields', function () {
        const messages = [
            { filed: 'name', output: 'É necessário informar o nome' },
            { filed: 'cpf', output: 'É necessário informar o CPF' },
            { filed: 'email', output: 'É necessário informar o email' },
            { filed: 'postalcode', output: 'É necessário informar o CEP' },
            { filed: 'number', output: 'É necessário informar o número do endereço' },
            { filed: 'delivery_method', output: 'Selecione o método de entrega' },
            { filed: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            SignupPage.go()
            SignupPage.submit()
        })

        messages.forEach(msg => {
            it(`${msg.filed} is required`, function() {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })

    })
})