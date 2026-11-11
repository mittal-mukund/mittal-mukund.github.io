$text = [System.IO.File]::ReadAllText("$PSScriptRoot\..\css\style.css")
$opens = [regex]::Matches($text, '\{').Count
$closes = [regex]::Matches($text, '\}').Count
Write-Host "CSS Braces -> Opens: $opens, Closes: $closes"
if ($opens -eq $closes) {
    Write-Host "CSS Braces: BALANCED" -ForegroundColor Green
} else {
    Write-Host "CSS Braces: MISMATCH" -ForegroundColor Red
}
