$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '[^{}]*invite-active[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
