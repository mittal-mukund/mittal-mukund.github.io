$css = [System.IO.File]::ReadAllText("css/style.css")
Write-Output $css.Substring(59400, 350)
