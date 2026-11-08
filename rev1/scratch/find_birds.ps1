$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.inv-bird|\.evt-bird)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
