# PowerShell script to help install better-sqlite3 on Windows

Write-Host "Installing better-sqlite3 for Windows..." -ForegroundColor Green

# Try to install with prebuilt binaries first
Write-Host "Attempting to install with prebuilt binaries..." -ForegroundColor Yellow
npm install better-sqlite3 --build-from-source=false

if ($LASTEXITCODE -ne 0) {
    Write-Host "`nPrebuilt binaries not available. You need to install build tools." -ForegroundColor Red
    Write-Host "`nOption 1: Install Visual Studio Build Tools" -ForegroundColor Cyan
    Write-Host "  Download from: https://visualstudio.microsoft.com/downloads/" -ForegroundColor White
    Write-Host "  Select 'Build Tools for Visual Studio'" -ForegroundColor White
    Write-Host "  Install 'Desktop development with C++' workload" -ForegroundColor White
    Write-Host "`nOption 2: Install windows-build-tools (requires admin)" -ForegroundColor Cyan
    Write-Host "  Run PowerShell as Administrator and run:" -ForegroundColor White
    Write-Host "  npm install -g windows-build-tools" -ForegroundColor Yellow
    Write-Host "`nAfter installing build tools, run: npm install" -ForegroundColor Green
    exit 1
} else {
    Write-Host "`nSuccessfully installed better-sqlite3!" -ForegroundColor Green
    Write-Host "You can now run: npm run dev" -ForegroundColor Green
}

