$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.inv-|\.invite-)[^{]*\{[^}]*(?:opacity\s*:\s*0|visibility\s*:\s*hidden)[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
