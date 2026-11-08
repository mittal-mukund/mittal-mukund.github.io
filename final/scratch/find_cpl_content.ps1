$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.cpl-content|\.cpl-story)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
