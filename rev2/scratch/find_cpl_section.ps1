$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '[^{}]*cpl-section[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
