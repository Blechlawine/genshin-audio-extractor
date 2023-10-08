import p from "path";
import fs from "fs";
import crypto from "crypto";
import { Hash, sequelize } from "./_database/client.cjs";

sequelize.sync({ alter: { drop: false } }).then(async () => {
    const pathIterator = walkIterator("./output");
    for (const path of pathIterator) {
        if (/\.(mp3|wav)$/.test(path)) {
            const file = fs.readFileSync(path);
            const base = crypto.createHash("sha256");
            base.update(file);
            const hash = base.digest("hex");
            console.log("HASH:", hash, "FILE:", p.win32.basename(path));
            await Hash.upsert({
                hash,
                currentFileName: p.win32.basename(path),
            });
        }
    }
});

function* walkIterator(path) {
    // walk directory tree starting from path
    let walkStack = Array.isArray(path) ? path : [path];
    while (walkStack.length) {
        const dirPath = walkStack.pop();
        if (dirPath) {
            let files = fs.readdirSync(dirPath);
            for (const file of files) {
                let filePath = p.join(dirPath, file);
                let stat = fs.statSync(filePath);
                if (stat.isDirectory()) {
                    walkStack.push(filePath);
                } else {
                    yield filePath;
                }
            }
        }
    }
}
