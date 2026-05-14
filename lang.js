const translations = {
  pt: {
    appTitle: "Missão 1 BTC",
    appSub: "✓ Dados salvos localmente",
    blockLabel: "Bloco",
    halvingLabel: "p/ Halving",
    saldoTitle: "Seu Saldo em Bitcoin",
    faltaLabel: "Faltam",
    para1btc: "para atingir 1 BTC",
    metaTitle: "Meta mensal",
    satsMes: "satoshis por mês",
    poder: "Poder de Compra (1 BRL)",
    poderUSD: "Poder de Compra (1 USD)",
    registros: "Total de Registros",
    curva: "Curva de Acúmulo (BTC)",
    backup: "Backup dos Dados",
    backupDesc: "Exporte em JSON para backup ou para usar em outro dispositivo",
    btnExp: "⬇ Backup (.json)",
    btnImp: "📊 Excel (.csv)",
    btnComp: "📸 Compartilhar",
    btnImport: "⬆ Importar",
    btnClr: "🗑 Limpar",
    hist: "Histórico de Aportes",
    thData: "Data / Hora",
    thPago: "Pago",
    thPreco: "Preço BTC",
    thNota: "Nota",
    emptyTbl: "Nenhum aporte ainda.",
    apoie: "Apoie o Projeto",
    apoieDesc: "Essa ferramenta é 100% gratuita. Se ela te ajudou, considere fazer uma doação em Bitcoin para manter o projeto vivo e atualizado!",
    btcAcumulado: "BTC ACUMULADO",
    totalInvestido: "TOTAL INVESTIDO",
    valorPosicao: "VALOR DA POSIÇÃO",
    progresso: "PROGRESSO",
    seuRank: "Seu Rank: ",
    regAporte: "Registrar Aporte",
    valorPagoUSD: "Valor pago (USD)",
    valorPagoBRL: "Valor pago (BRL)",
    qtdBTC: "Quantidade de BTC",
    dataAporte: "Data do Aporte",
    calcAuto: "↑ Calculado auto",
    quantoFalta: "Quanto Falta para 1 BTC",
    faltaBTC: "Falta em BTC",
    faltaUSD: "Falta em USD",
    faltaBRL: "Falta em BRL",
    precoMedio: "Preço médio de entrada",
    estatisticas: "Estatísticas e Histórico",
    statusPreco: "Status do Preço Médio",
    maiorAporte: "Maior Aporte Feito",
    freqMedia: "Frequência Média",
    desenvolvidoPor: "Desenvolvido por",
    adPixGoText: "A melhor API de pagamentos via Pix para o seu negócio. Transforme o pix do seu cliente em depix e receba diretamente na sua wallet.",
    adProhashText: "Proteja suas criptomoedas de verdade usando as melhores hardware wallets do mercado.",
    seguranca: "Segurança",
    patrocinado: "Patrocinado",
    btnAdd: "Adicionar Aporte"
  },
  en: {
    appTitle: "1 BTC Mission",
    appSub: "✓ Data saved locally",
    blockLabel: "Block",
    halvingLabel: "to Halving",
    saldoTitle: "Your Bitcoin Balance",
    faltaLabel: "Remaining",
    para1btc: "to reach 1 BTC",
    metaTitle: "Monthly Goal",
    satsMes: "satoshis per month",
    poder: "Purchasing Power (1 BRL)",
    poderUSD: "Purchasing Power (1 USD)",
    registros: "Total Records",
    curva: "Accumulation Curve (BTC)",
    backup: "Data Backup",
    backupDesc: "Export JSON for backup or to use on another device",
    btnExp: "⬇ Backup (.json)",
    btnImp: "📊 Excel (.csv)",
    btnComp: "📸 Share",
    btnImport: "⬆ Import",
    btnClr: "🗑 Clear",
    hist: "Contribution History",
    thData: "Date / Time",
    thPago: "Paid",
    thPreco: "BTC Price",
    thNota: "Note",
    emptyTbl: "No contributions yet.",
    apoie: "Support the Project",
    apoieDesc: "This tool is 100% free. If it helped you, consider making a Bitcoin donation to keep the project alive and updated!",
    btcAcumulado: "ACCUMULATED BTC",
    totalInvestido: "TOTAL INVESTED",
    valorPosicao: "POSITION VALUE",
    progresso: "PROGRESS",
    seuRank: "Your Rank: ",
    regAporte: "Register Contribution",
    valorPagoUSD: "Paid amount (USD)",
    valorPagoBRL: "Paid amount (BRL)",
    qtdBTC: "BTC Amount",
    dataAporte: "Contribution Date",
    calcAuto: "↑ Auto calculated",
    quantoFalta: "How much left for 1 BTC",
    faltaBTC: "Left in BTC",
    faltaUSD: "Left in USD",
    faltaBRL: "Left in BRL",
    precoMedio: "Average entry price",
    estatisticas: "Statistics and History",
    statusPreco: "Average Price Status",
    maiorAporte: "Largest Contribution",
    freqMedia: "Average Frequency",
    desenvolvidoPor: "Developed by",
    adPixGoText: "The best Pix payment API for your business. Transform your client's pix into depix and receive directly to your wallet.",
    adProhashText: "Truly protect your crypto assets using the best hardware wallets on the market.",
    seguranca: "Security",
    patrocinado: "Sponsored",
    btnAdd: "Add Contribution"
  }
};

let currentLang = localStorage.getItem('lang') || 'pt';

function applyLang() {
  const dict = translations[currentLang];
  
  // Header
  document.getElementById('lang-btn').textContent = currentLang.toUpperCase();
  
  // We use a safe replacement to avoid losing events.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  let node;
  const nodesToReplace = [];
  while (node = walker.nextNode()) {
      if (node.parentElement && node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
          nodesToReplace.push(node);
      }
  }

  const baseDict = currentLang === 'en' ? translations.pt : translations.en;
  
  // Sort keys by length descending to prevent partial word replacement bugs
  const keys = Object.keys(baseDict).sort((a, b) => baseDict[b].length - baseDict[a].length);

  nodesToReplace.forEach(n => {
      let text = n.nodeValue;
      let changed = false;
      for (const key of keys) {
          if (text.includes(baseDict[key])) {
              text = text.replace(baseDict[key], dict[key]);
              changed = true;
          }
      }
      if (changed) {
          n.nodeValue = text;
      }
  });

  // Specifically target inputs placeholders
  const noteInput = document.getElementById('f-nota');
  if(noteInput) {
      if(currentLang === 'en') noteInput.placeholder = 'Your note (optional)...';
      else noteInput.placeholder = 'Sua anotação (opcional)...';
  }
}

function toggleLang() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('lang', currentLang);
  location.reload();
}

document.addEventListener("DOMContentLoaded", () => {
    applyLang();
});
