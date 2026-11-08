$css = Get-Content 'css/style.css' -Raw
$idx = $css.IndexOf('.cpl-tree--left{transform:translate(-100%)!important}')
if ($idx -ge 0) {
    Write-Output $css.Substring([math]::Max(0, $idx - 150), 300)
}
