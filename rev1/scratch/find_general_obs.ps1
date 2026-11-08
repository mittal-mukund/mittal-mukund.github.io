$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'const generalObserver[^{]*\{[\s\S]*?(?=\n\s*const|\n\s*function|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
