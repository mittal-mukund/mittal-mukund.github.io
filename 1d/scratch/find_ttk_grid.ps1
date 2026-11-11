$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '[^{}]*ttk-grid[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
