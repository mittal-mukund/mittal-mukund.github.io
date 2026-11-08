$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'function initStarfield[^{]*\{[\s\S]*?(?=\n\s*function initFireworks|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
