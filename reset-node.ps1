if (Test-Path node_modules) {
    Remove-Item -Recurse -Force node_modules
    Write-Host "node_modules deleted."
} else {
    Write-Host "node_modules not found."
}

if (Test-Path package-lock.json) {
    Remove-Item -Force package-lock.json
    Write-Host "package-lock.json deleted."
} else {
    Write-Host "package-lock.json not found."
}
