# ==============================================================================
# RADOPS - MÁY CHỦ CỤC BỘ PHỤC VỤ TRUY CẬP NỘI VIỆN & NGOẠI VIỆN (LAN / WI-FI)
# Khoa Chẩn đoán hình ảnh - Bệnh viện Quốc tế Vĩnh Phúc (VPI)
# ==============================================================================

$port = 8080
$baseDir = $PSScriptRoot

# Lấy địa chỉ IP mạng nội bộ (LAN / Wi-Fi) của máy tính
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { 
    $_.InterfaceAlias -notmatch "Loopback" -and 
    $_.IPAddress -notmatch "^169\.254\." -and 
    $_.IPAddress -notmatch "^127\." 
} | Select-Object -First 1).IPAddress

if (-not $localIP) {
    $localIP = "127.0.0.1"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")

try {
    $listener.Start()
} catch {
    # Nếu chưa chạy quyền Administrator để bind http://*:8080/, fallback về localhost
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Clear-Host
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "  RADOPS - MAY CHU TRUY CAP THIET BI & ATBX KHOA CDHA (BV VPI)       " -ForegroundColor Yellow
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host " [1] Truy cap tren may nay:    http://localhost:$port" -ForegroundColor Green
Write-Host " [2] Truy cap tren Dien thoai / May khac (Cung Wi-Fi / LAN):" -ForegroundColor Green
Write-Host "     ==>  http://${localIP}:$port  <==" -ForegroundColor Yellow
Write-Host ""
Write-Host " [3] Huong dan truy cap NGOAI VIEN (Internet / 4G):" -ForegroundColor Cyan
Write-Host "     - Ban co the dung Cloudflare Tunnel hoac day len Vercel mien phi" -ForegroundColor Gray
Write-Host "     - Nhan vien dung dien thoai co the quet ma QR de dang nhap tu xa" -ForegroundColor Gray
Write-Host ""
Write-Host " May chu dang hoat dong... Nhan Ctrl + C de dung." -ForegroundColor Magenta
Write-Host "--------------------------------------------------------------------"

# Mo trinh duyet mac dinh
Start-Process "http://localhost:$port"

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/" -or [string]::IsNullOrWhiteSpace($urlPath)) {
        $urlPath = "/index.html"
    }

    $filePath = Join-Path $baseDir ($urlPath.TrimStart('/').Replace('/', '\'))

    if (Test-Path $filePath -PathType Leaf) {
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = "text/plain; charset=utf-8"
        switch ($ext) {
            ".html" { $contentType = "text/html; charset=utf-8" }
            ".css"  { $contentType = "text/css; charset=utf-8" }
            ".js"   { $contentType = "application/javascript; charset=utf-8" }
            ".json" { $contentType = "application/json; charset=utf-8" }
            ".png"  { $contentType = "image/png" }
            ".jpg"  { $contentType = "image/jpeg" }
            ".jpeg" { $contentType = "image/jpeg" }
            ".svg"  { $contentType = "image/svg+xml" }
            ".ico"  { $contentType = "image/x-icon" }
        }

        $response.ContentType = $contentType
        $response.ContentLength64 = $bytes.Length
        $response.StatusCode = 200
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $notFoundMsg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.OutputStream.Write($notFoundMsg, 0, $notFoundMsg.Length)
    }

    $response.Close()
}
