$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'function initTreeCurtain[^{]*\{[\s\S]*?(?=\n\/\*|\nfunction|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
