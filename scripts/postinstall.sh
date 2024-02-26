# Specify the required global NPM packages.
GLOBAL_NPM_SCRIPTS=( "npx patch-package" )

# Apply patches.
npx patch-package
echo "✅ All patches applied"
