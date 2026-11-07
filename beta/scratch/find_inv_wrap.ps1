$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.invite-card-wrap|\.invite-arch-frame|\.invite-bg)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
