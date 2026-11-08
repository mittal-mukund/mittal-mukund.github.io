$css = Get-Content 'css/style.css' -Raw
$idx = $css.IndexOf('.invite-birds{display:none!important}')
if ($idx -ge 0) {
    Write-Output $css.Substring([math]::Max(0, $idx - 200), 400)
} else {
    Write-Output "Not found exact string"
    $matches = [regex]::Matches($css, '.{0,100}invite-birds.{0,100}')
    foreach ($m in $matches) { Write-Output "MATCH: " + $m.Value }
}
