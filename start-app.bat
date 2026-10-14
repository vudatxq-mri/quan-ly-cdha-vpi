@echo off
@chcp 65001 >nul
title RADOPS - QL Thiet bi & ATBX - BV Vinh Phuc VPI
echo ====================================================================
echo   RADOPS - HE THONG QUAN LY THIET BI CDHA & AN TOAN BUC XA
echo   Khoa Chan doan hinh anh - Benh vien Quoc te Vinh Phuc (VPI)
echo   Phu trach Khoa: BS. CKI. Trinh Van Binh
echo   KTV Truong / Phu trach ATBX: KTV. Vu Ba Dat
echo ====================================================================
echo.
echo Dang mo ung dung trong trinh duyet web mac dinh...
start "" "%~dp0index.html"
echo.
echo Da mo ung dung thanh cong!
timeout /t 3 >nul
exit
