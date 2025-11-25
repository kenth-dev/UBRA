# Copies auction app public images into UBRA public/images/auction
set -e
$src = Resolve-Path (Join-Path $PSScriptRoot "..\..\..\auction\my-app\public")
$dest = Resolve-Path (Join-Path $PSScriptRoot "..\public\images\auction") -ErrorAction SilentlyContinue
if (-not $dest) {
  $destPath = Join-Path $PSScriptRoot "..\public\images\auction"
  New-Item -ItemType Directory -Path $destPath -Force | Out-Null
  $dest = Resolve-Path $destPath
}

Write-Host "Copying images from $src to $dest"

# copy jpg, png, svg
Get-ChildItem -Path $src -File -Include *.jpg,*.png,*.svg | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $dest -Force
  Write-Host "Copied: $($_.Name)"
}

Write-Host "Done."
