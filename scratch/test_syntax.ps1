$css = [System.IO.File]::ReadAllText("$PSScriptRoot\..\css\style.css")
$cssOpens = [regex]::Matches($css, '\{').Count
$cssCloses = [regex]::Matches($css, '\}').Count
Write-Host "CSS Braces: Opens=$cssOpens, Closes=$cssCloses"

$js = [System.IO.File]::ReadAllText("$PSScriptRoot\..\js\script.js")
$jsOpens = [regex]::Matches($js, '\{').Count
$jsCloses = [regex]::Matches($js, '\}').Count
Write-Host "JS Braces: Opens=$jsOpens, Closes=$jsCloses"

if ($cssOpens -eq $cssCloses -and $jsOpens -eq $jsCloses) {
    Write-Host "ALL SYNTAX CHECKS PASSED!" -ForegroundColor Green
} else {
    Write-Host "SYNTAX ERROR DETECTED!" -ForegroundColor Red
}
