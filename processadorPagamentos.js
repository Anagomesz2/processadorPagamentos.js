// Passo 2
function processarTransacaoPix(chavePix, valor, callbackAcao) {
  if (valor <= 0) {
    console.log(`❌ Ops! O valor R$ ${valor} é inválido. Digite um valor maior que zero.\n`);
    return;
  }

  const transacao = {
    id: Math.floor(Math.random() * 100000),
    chavePix,
    valor,
    data: new Date().toLocaleTimeString()
  };

  console.log(`\n✅ Transação ID #${transacao.id} processada!`);
  
  callbackAcao(transacao);
}

// Passo 3
function emitirComprovantePorEmail(transacao) {
  console.log(`📧 [Comprovante enviado por e-mail]`);
  console.log(`   ID: ${transacao.id} | Chave: ${transacao.chavePix} | Valor: R$ ${transacao.valor.toFixed(2)} | Horário: ${transacao.data}`);
}

function creditarCashback(transacao) {
  const cashback = transacao.valor * 0.02;
  console.log(`💰 [Cashback] Você ganhou R$ ${cashback.toFixed(2)} de volta!`);
}

function auditarTransacaoSuspeita(transacao) {
  if (transacao.valor > 5000) {
    console.log(`🚨 [ALERTA] Transação suspeita acima de R$ 5.000,00! ID #${transacao.id} enviada para análise.`);
  } else {
    console.log(`🛡️ Transação ID #${transacao.id} aprovada na auditoria.`);
  }
}

function enviarWebhookAssincrono(transacao, callbackFinalizacao) {
  console.log(`\n⏱️ Enviando notificação externa para a transação #${transacao.id}...`);

  setTimeout(() => {
    console.log(`📡 Webhook respondido pela loja!`);
    callbackFinalizacao(transacao);
  }, 2000);
}


console.log("=== TESTES DO GATEWAY PAYFAST ===");

processarTransacaoPix("anagomes@email.com", 150.00, emitirComprovantePorEmail);

processarTransacaoPix("123.456.789-00", 250.00, creditarCashback);

processarTransacaoPix("empresa@teste.com", 8500.00, auditarTransacaoSuspeita);

processarTransacaoPix("joao@email.com", 100.00, (transacao) => {
  const valorFinal = transacao.valor - 5;
  console.log(`🏷️ Desconto de R$ 5,00 aplicado! Valor final: R$ ${valorFinal.toFixed(2)}`);
});

//Passo 5
processarTransacaoPix("loja@suporte.com", 1200.00, (transacao) => {
  enviarWebhookAssincrono(transacao, (transacaoFinal) => {
    console.log(`🎉 Notificação da transação #${transacaoFinal.id} finalizada com sucesso!`);
  });
});