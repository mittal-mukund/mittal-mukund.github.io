$css = Get-Content 'css/style.css' -Raw
$matches = [regex]::Matches($css, '(?:\.invite-bg|\.evt-bg|\.cpl-bg|\.venue-bg|\.gal-bg|\.rsvp-bg)[^{]*\{[^}]*\}')
foreach ($m in $matches) {
    Write-Output $m.Value
}
