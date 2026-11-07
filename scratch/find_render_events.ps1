$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'function renderEvents[^{]*\{[\s\S]*?(?=\n\s*function renderGallery|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
