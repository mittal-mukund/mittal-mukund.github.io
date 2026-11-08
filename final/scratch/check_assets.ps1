Get-ChildItem -Path "assets" -Recurse -File | Select-Object FullName, Length | Sort-Object Length -Descending | ForEach-Object {
    [PSCustomObject]@{
        SizeKB = [math]::Round($_.Length / 1KB, 1)
        Path = $_.FullName.Replace((Get-Location).Path + "\", "")
    }
} | Format-Table -AutoSize
