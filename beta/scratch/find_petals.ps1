$js = Get-Content 'js/script.js' -Raw
$matches = [regex]::Matches($js, 'invitePetals[^{]*\{[\s\S]*?(?=\n\s*function|\Z)')
foreach ($m in $matches) {
    Write-Output $m.Value
}
