// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    
    // Elementos do formulário
    const nome = document.getElementById('nome');
    const email = document.getElementById('email');
    const telefone = document.getElementById('telefone');
    const cpf = document.getElementById('cpf');
    const dataNascimento = document.getElementById('dataNascimento');
    
    // Elementos de erro
    const nomeError = document.getElementById('nomeError');
    const emailError = document.getElementById('emailError');
    const telefoneError = document.getElementById('telefoneError');
    const cpfError = document.getElementById('cpfError');
    const dataError = document.getElementById('dataError');
    const successMessage = document.getElementById('successMessage');
    
    // Aplicar máscaras aos campos
    aplicarMascaraTelefone();
    aplicarMascaraCPF();
    
    // Função para aplicar máscara ao telefone
    function aplicarMascaraTelefone() {
        telefone.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            if (valor.length <= 11) {
                if (valor.length <= 10) {
                    valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
                } else {
                    valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                }
                e.target.value = valor;
            }
        });
    }
    
    // Função para aplicar máscara ao CPF
    function aplicarMascaraCPF() {
        cpf.addEventListener('input', function(e) {
            let valor = e.target.value.replace(/\D/g, '');
            
            if (valor.length <= 11) {
                valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
                e.target.value = valor;
            }
        });
    }
    
    // Função de validação do nome
    function validarNome() {
        const nomeValor = nome.value.trim();
        if (nomeValor.length < 3) {
            mostrarErro(nomeError);
            return false;
        }
        esconderErro(nomeError);
        return true;
    }
    
    // Função de validação do email
    function validarEmail() {
        const emailValor = email.value.trim();
        if (!emailValor.includes('@')) {
            mostrarErro(emailError);
            return false;
        }
        esconderErro(emailError);
        return true;
    }
    
    // Função de validação do telefone
    function validarTelefone() {
        const telefoneValor = telefone.value.replace(/\D/g, '');
        if (telefoneValor.length < 10 || telefoneValor.length > 11) {
            mostrarErro(telefoneError);
            return false;
        }
        esconderErro(telefoneError);
        return true;
    }
    
    // Função de validação do CPF
    function validarCPF() {
        const cpfValor = cpf.value.replace(/\D/g, '');
        
        // Verifica se tem 11 dígitos
        if (cpfValor.length !== 11) {
            mostrarErro(cpfError);
            return false;
        }
        
        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpfValor)) {
            mostrarErro(cpfError);
            return false;
        }
        
        // Validação dos dígitos verificadores
        if (!validarDigitosCPF(cpfValor)) {
            mostrarErro(cpfError);
            return false;
        }
        
        esconderErro(cpfError);
        return true;
    }
    
    // Função auxiliar para validar os dígitos verificadores do CPF
    function validarDigitosCPF(cpf) {
        // Primeiro dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let primeiroDigito = 11 - (soma % 11);
        if (primeiroDigito >= 10) primeiroDigito = 0;
        
        if (primeiroDigito !== parseInt(cpf.charAt(9))) {
            return false;
        }
        
        // Segundo dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        let segundoDigito = 11 - (soma % 11);
        if (segundoDigito >= 10) segundoDigito = 0;
        
        return segundoDigito === parseInt(cpf.charAt(10));
    }
    
    // Função de validação da data de nascimento
    function validarDataNascimento() {
        const dataValor = new Date(dataNascimento.value);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataValor.getFullYear();
        const mesAtual = hoje.getMonth();
        const diaAtual = hoje.getDate();
        const mesNascimento = dataValor.getMonth();
        const diaNascimento = dataValor.getDate();
        
        let idadeExata = idade;
        
        // Ajusta a idade se o aniversário ainda não passou este ano
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && diaAtual < diaNascimento)) {
            idadeExata--;
        }
        
        if (idadeExata < 18) {
            mostrarErro(dataError);
            return false;
        }
        
        esconderErro(dataError);
        return true;
    }
    
    // Função para mostrar erro
    function mostrarErro(elemento) {
        elemento.style.display = 'block';
    }
    
    // Função para esconder erro
    function esconderErro(elemento) {
        elemento.style.display = 'none';
    }
    
    // Função para esconder mensagem de sucesso
    function esconderSucesso() {
        successMessage.style.display = 'none';
    }
    
    // Função para mostrar mensagem de sucesso
    function mostrarSucesso() {
        successMessage.style.display = 'block';
        setTimeout(() => {
            esconderSucesso();
        }, 3000);
    }
    
    // Validação em tempo real
    nome.addEventListener('blur', validarNome);
    email.addEventListener('blur', validarEmail);
    telefone.addEventListener('blur', validarTelefone);
    cpf.addEventListener('blur', validarCPF);
    dataNascimento.addEventListener('blur', validarDataNascimento);
    
    // Manipulador do evento de submit do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Esconder mensagem de sucesso anterior
        esconderSucesso();
        
        // Executar todas as validações
        const nomeValido = validarNome();
        const emailValido = validarEmail();
        const telefoneValido = validarTelefone();
        const cpfValido = validarCPF();
        const dataValida = validarDataNascimento();
        
        // Se todas as validações passaram
        if (nomeValido && emailValido && telefoneValido && cpfValido && dataValida) {
            mostrarSucesso();
            
            // Aqui você pode adicionar código para enviar os dados para um servidor
            console.log('Formulário válido! Dados do aluno:');
            console.log('Nome:', nome.value);
            console.log('Email:', email.value);
            console.log('Telefone:', telefone.value);
            console.log('CPF:', cpf.value);
            console.log('Data de Nascimento:', dataNascimento.value);
            
            // Opcional: limpar o formulário após o sucesso
            // form.reset();
        }
    });
    
    // Manipulador do botão reset
    form.addEventListener('reset', function() {
        // Esconder todas as mensagens de erro e sucesso
        const errors = document.querySelectorAll('.error');
        errors.forEach(error => esconderErro(error));
        esconderSucesso();
    });
});