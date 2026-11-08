$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, '(?i)[^\n]*bird[^\n]*')
foreach ($m in $matches) {
    Write-Output $m.Value
}
