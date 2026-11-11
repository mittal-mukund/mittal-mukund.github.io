$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.inv-blessing|\.inv-names|\.inv-kicker|\.inv-parents|\.inv-meta)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
