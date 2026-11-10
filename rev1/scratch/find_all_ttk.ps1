$css = Get-Content 'css/style.css' -Raw
$idx = $css.IndexOf('.ttk-card')
while ($idx -ge 0) {
    Write-Output "--- OCCURRENCE AT $idx ---"
    Write-Output $css.Substring([math]::Max(0, $idx - 50), [math]::Min(300, $css.Length - $idx))
    $idx = $css.IndexOf('.ttk-card', $idx + 1)
}
