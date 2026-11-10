$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '[^{}]*(?:#introNames|\.intro-reveal \.names|\.names)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
