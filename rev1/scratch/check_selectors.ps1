$css = [System.IO.File]::ReadAllText("css/style.css")
$matches = [regex]::Matches($css, '(?:\.intro-reveal|\.cpl-|\.ttk-)[^{]*\{[^}]*\}')
foreach ($m in $matches | Where-Object { $_.Index -lt 60000 }) {
    Write-Output "[$($m.Index)] $($m.Value.Substring(0, [math]::Min(80, $m.Value.Length)))"
}
