@echo off
@chcp 65001 >nul
title RADOPS LAN SERVER - KHOA CDHA BV VPI
echo ====================================================================
echo   KHOI DONG MAY CHU CHIA SE RADOPS CHO DIEN THOAI & NGOAI VIEN
echo   Khoa Chan doan hinh anh - Benh vien Quoc te Vinh Phuc (VPI)
echo ====================================================================
echo.
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
