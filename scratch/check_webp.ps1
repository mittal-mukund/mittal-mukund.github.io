$fileM = "assets/meet_the_couple/pn-cpl-bg-secret-garden-m-v01.webp"
$fileD = "assets/meet_the_couple/pn-cpl-bg-secret-garden-d-v01.webp"

$bytesM = [System.IO.File]::ReadAllBytes($fileM)
$bytesD = [System.IO.File]::ReadAllBytes($fileD)

Write-Host "Mobile File: Length = " $bytesM.Length
Write-Host "Mobile Header: " ([System.Text.Encoding]::ASCII.GetString($bytesM[0..11]))

Write-Host "Desktop File: Length = " $bytesD.Length
Write-Host "Desktop Header: " ([System.Text.Encoding]::ASCII.GetString($bytesD[0..11]))
