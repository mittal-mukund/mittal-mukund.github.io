$css = Get-Content 'css/style.css' -Raw
Write-Output "--- will-change occurrences ---"
$matches = [regex]::Matches($css, '[^{}]*will-change:[^;}]*')
foreach ($m in $matches) {
    Write-Output $m.Value.Trim()
}

Write-Output "`n--- translateZ / translate3d occurrences ---"
$matches2 = [regex]::Matches($css, '[^{}]*translate[3dZ][^;}]*')
foreach ($m in $matches2) {
    Write-Output $m.Value.Trim()
}
