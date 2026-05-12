@echo off
echo ==========================================
echo Instalando dependencias (PyWebView e PyInstaller)
echo ==========================================
pip install pywebview pyinstaller

echo.
echo ==========================================
echo Compilando Executavel (Missao_1BTC_Tracker.exe)
echo ==========================================
pyinstaller --noconsole --onefile --add-data "index.html;." --name "Missao_1BTC_Tracker" app.py

echo.
echo ==========================================
echo Concluido! 
echo O executavel esta na pasta "dist".
echo Pode enviar apenas o arquivo "dist\Missao_1BTC_Tracker.exe" para seus clientes.
echo ==========================================
pause
