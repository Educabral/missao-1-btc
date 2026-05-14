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
    apoieDesc: "Essa ferramenta é 100% gratuita. Se ela te ajudou, considere fazer uma doação em Bitcoin para manter o projeto vivo e atualizado!"
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
    registros: "Total Records",
    curva: "Accumulation Curve (BTC)",
    backup: "Data Backup",
    backupDesc: "Export JSON to backup or use on another device",
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
    apoieDesc: "This tool is 100% free. If it helped you, consider making a Bitcoin donation to keep the project alive and updated!"
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
  
  nodesToReplace.forEach(n => {
      let text = n.nodeValue;
      let changed = false;
      for (const key in baseDict) {
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
  const placeholderDict = {
      'Sua anotação (opcional)...': 'Your note (optional)...',
      'Your note (optional)...': 'Sua anotação (opcional)...'
  };
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
