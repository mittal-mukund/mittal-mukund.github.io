$css = [System.IO.File]::ReadAllText("css/style.css")
Write-Output "Total CSS Length: " $css.Length

# Search for any non-ASCII characters or syntax anomalies between 30000 and 60000
$sub = $css.Substring(35000, 25000)
$nonAscii = [regex]::Matches($sub, '[^\x00-\x7F]')
Write-Output "Non-ASCII count between 35000 and 60000: " $nonAscii.Count
foreach ($na in $nonAscii | Select-Object -First 10) {
    Write-Output "Non-ASCII char: '$($na.Value)' at index $($na.Index)"
}
