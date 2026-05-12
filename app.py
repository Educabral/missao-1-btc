import os
import sys
import json
import webview

def get_data_path():
    # Obtém o caminho correto onde o executável ou script está rodando
    if getattr(sys, 'frozen', False):
        app_path = os.path.dirname(sys.executable)
    else:
        app_path = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(app_path, 'dados_missao_1btc.json')

class Api:
    def load_data(self):
        """Carrega os dados do arquivo JSON localmente"""
        path = get_data_path()
        if os.path.exists(path):
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception as e:
                print(f"Erro ao carregar dados: {e}")
                return []
        return []

    def save_data(self, data):
        """Salva os dados no arquivo JSON localmente"""
        path = get_data_path()
        try:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=4)
            return True
        except Exception as e:
            print(f"Erro ao salvar dados: {e}")
            return False

if __name__ == '__main__':
    # Determinar caminho do index.html (funciona tanto no código-fonte quanto compilado)
    html_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'index.html')
    if getattr(sys, 'frozen', False):
        html_file = os.path.join(sys._MEIPASS, 'index.html')

    # Ler o conteúdo do HTML
    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
    except Exception as e:
        html_content = f"<h1>Erro ao carregar HTML: {e}</h1>"

    api = Api()
    
    # Criar janela do App
    window = webview.create_window(
        'Missão 1 BTC - Tracker',
        html=html_content,
        js_api=api,
        width=850,
        height=750,
        background_color='#0f0f0f'
    )
    
    # Iniciar App
    webview.start(private_mode=False)
