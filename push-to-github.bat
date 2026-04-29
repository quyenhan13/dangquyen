@echo off
title VTeen - Push to GitHub
echo 📤 Dang day code len GitHub de build IPA...
cd vteen-ios
git add .
git commit -m "Auto-update from PC"
git push origin main
echo ✅ Da xong! Hay vao GitHub Actions de tai IPA moi nhat.
pause
