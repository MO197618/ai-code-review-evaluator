
import fs from "node:fs";
import path from "node:path";

const file = process.argv[2];

if (!file) {
console.error("Usage: node src/index.js <code-file>");
process.exit(1);
}

if (!fs.existsSync(file)) {
console.error(`File not found: ${file}`);
process.exit(1);
}

const code = fs.readFileSync(file, "utf8");
const issues = [];

if (!code.trim()) {
issues.push({
severity: "ERROR",
message: "The file is empty."
});
}

if (code.includes("eval(")) {
issues.push({
severity: "WARNING",
message: "Review use of eval() for security risks."
});
}

if (/console\.log\(/.test(code)) {
issues.push({
severity: "WARNING",
message: "Found console.log(); verify whether it is needed."
});
}

const result = {
file: path.resolve(file),
language: path.extname(file),
totalIssues: issues.length,
issues
};

console.log(JSON.stringify(result, null, 2));
