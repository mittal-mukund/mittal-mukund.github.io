$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '[^{}]*cpl-tree--left[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
