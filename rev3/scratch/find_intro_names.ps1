$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.intro-reveal|\.names)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
