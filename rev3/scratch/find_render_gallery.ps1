$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'function renderGallery[^{]*\{[\s\S]*?(?=\n\s*function renderTTK|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
