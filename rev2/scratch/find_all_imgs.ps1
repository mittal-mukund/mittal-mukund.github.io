$html = Get-Content 'index.html' -Raw
$matches = [regex]::Matches($html, '<img[^>]+>')
foreach ($m in $matches) {
    Write-Output $m.Value
}
