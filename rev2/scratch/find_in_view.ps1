$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.reveal-item|\.in-view)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
