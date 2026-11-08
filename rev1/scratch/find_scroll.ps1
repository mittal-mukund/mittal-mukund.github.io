$js = Get-Content 'js/script.js' -Raw
Write-Output "--- JS Scroll Listeners & Observers ---"
$matches = [regex]::Matches($js, '(?:addEventListener\(["'']scroll|IntersectionObserver|requestAnimationFrame)[^;\n]*')
foreach ($m in $matches) {
    Write-Output $m.Value
}
