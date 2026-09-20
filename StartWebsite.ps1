param(
  [Parameter(Mandatory = $true)][string]$NodePath,
  [ValidateRange(1024,65535)][int]$Port = 4180
)
$ErrorActionPreference = 'Stop'
# Owner-run entry point for an approved, dedicated hosting checkout.
# This script does not install software, register tasks or configure a tunnel.
if (-not (Test-Path -LiteralPath $NodePath -PathType Leaf)) { throw 'Supply the installed node.exe path.' }
$releaseHome = Join-Path $PSScriptRoot 'release/index.html'
if (-not (Test-Path -LiteralPath $releaseHome -PathType Leaf)) { throw 'Build and approve a release before starting the host.' }
$releaseHtml = [System.IO.File]::ReadAllText($releaseHome)
if ($releaseHtml -match 'noindex|Business contact details coming soon|not accepting inquiries yet') { throw 'The release still has draft restrictions or unfinished contact details.' }
$env:ITOT_PORT = [string]$Port
& $NodePath (Join-Path $PSScriptRoot 'server.mjs') --published
exit $LASTEXITCODE
