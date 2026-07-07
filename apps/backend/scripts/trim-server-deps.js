// Runs after `medusa build`, before the `.medusa/server` npm install.
// Strips admin-dashboard-only packages from the generated package.json.
// Safe only because this deployment sets admin.disable=true (DISABLE_MEDUSA_ADMIN):
// the compiled backend never requires these at runtime when admin is disabled,
// and removing them shrinks the second `npm install` enough to avoid OOM on
// memory-constrained hosts (e.g. Render's free 512MB tier).
const fs = require("fs")
const path = require("path")

const pkgPath = path.join(__dirname, "..", ".medusa", "server", "package.json")
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))

const ADMIN_ONLY_DEPS = [
  "@medusajs/dashboard",
  "@medusajs/admin-sdk",
  "@medusajs/admin-shared",
  "@medusajs/ui",
  "@medusajs/icons",
  "@medusajs/js-sdk",
  "@tanstack/react-query",
  "react-i18next",
  "react-router-dom",
]

for (const dep of ADMIN_ONLY_DEPS) {
  delete pkg.dependencies?.[dep]
}
pkg.devDependencies = {}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

console.log(
  `[trim-server-deps] Removed ${ADMIN_ONLY_DEPS.length} admin-only package(s) from .medusa/server/package.json`
)
