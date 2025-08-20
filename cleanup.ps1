Write-Host "Cleaning up project files and directories..." -ForegroundColor Yellow

# Function to remove directory with retry
function Remove-DirectoryWithRetry {
    param (
        [string]$path,
        [int]$retryCount = 3
    )
    
    for ($i = 1; $i -le $retryCount; $i++) {
        try {
            if (Test-Path $path) {
                Write-Host "Attempting to remove $path (attempt $i of $retryCount)" -ForegroundColor Cyan
                Remove-Item -Path $path -Recurse -Force -ErrorAction Stop
                Write-Host "Successfully removed $path" -ForegroundColor Green
                return $true
            }
        }
        catch {
            if ($i -eq $retryCount) {
                Write-Host "Failed to remove $path after $retryCount attempts" -ForegroundColor Red
                return $false
            }
            Start-Sleep -Seconds 1
        }
    }
    return $true
}

# List of items to remove
$itemsToRemove = @(
    ".next",
    "node_modules",
    "static-html",
    "static-export",
    "out",
    "package-lock.json",
    "yarn.lock",
    ".env.local"
)

# Remove each item
foreach ($item in $itemsToRemove) {
    Remove-DirectoryWithRetry -path $item
}

Write-Host "`nCleanup completed!" -ForegroundColor Green
Write-Host "You can now start fresh with 'npm install' to reinstall dependencies." -ForegroundColor Yellow
