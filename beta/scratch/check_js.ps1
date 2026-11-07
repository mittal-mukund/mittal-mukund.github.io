$js = [System.IO.File]::ReadAllText("$PSScriptRoot\..\js\script.js")
$opens = [regex]::Matches($js, '\{').Count
$closes = [regex]::Matches($js, '\}').Count
$openParens = [regex]::Matches($js, '\(').Count
$closeParens = [regex]::Matches($js, '\)').Count
Write-Host "JS Braces -> Opens: $opens, Closes: $closes"
Write-Host "JS Parens -> Opens: $openParens, Closes: $closeParens"
if ($opens -eq $closes -and $openParens -eq $closeParens) {
    Write-Host "JS: BALANCED" -ForegroundColor Green
} else {
    Write-Host "JS: MISMATCH" -ForegroundColor Red
}
