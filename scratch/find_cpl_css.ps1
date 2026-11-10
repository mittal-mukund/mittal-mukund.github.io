$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.cpl-tree|\.cpl-section|\.cpl-vignette)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
