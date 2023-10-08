import inquirer from "inquirer";
import fs from "fs";
import { dirname, join } from "path";
import yml from "yaml";
import { Hash } from "./_database/client.cjs";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const possibleVersions = fs.readdirSync("./_metadata");

inquirer
    .prompt([
        {
            type: "list",
            name: "version",
            message: "Which version would you like to extract?",
            choices: possibleVersions,
        },
    ])
    .then(async (answers) => {
        const versionFile = fs.readFileSync(`./_metadata/${answers.version}`, "utf-8");
        const parsed = yml.parse(versionFile);
        const outputFolder = join(__dirname, "/extracted/", answers.version.split(".")[0]);
        if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);

        for (const data of parsed.metadata) {
            const fromDatabase = await Hash.findByPk(data.hash);
            fromDatabase.set("musicType", data.musicType ?? fromDatabase.musicType);
            fromDatabase.set("title", data.title ?? fromDatabase.title);
            fromDatabase.set("album", data.album ?? fromDatabase.album);
            fromDatabase.set("area", data.area ?? fromDatabase.area);
            fromDatabase.set("gameVersion", data.gameVersion ?? fromDatabase.gameVersion);
            fromDatabase.save();
            const path = join(
                __dirname,
                `/output/WAV/${fromDatabase.currentFileName.split("_")[0]}/${fromDatabase.currentFileName}`
            );
            const s = fromDatabase.currentFileName.split(".");
            const pathDestination = join(
                __dirname,
                "/extracted/",
                answers.version.replace(".yml", ""),
                data.album,
                `Disc-${data.disc.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                })}`
            );
            if (!fs.existsSync(pathDestination)) fs.mkdirSync(pathDestination, { recursive: true });
            fs.copyFileSync(
                path,
                join(
                    pathDestination,
                    `${data.track.toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${data.title}.${
                        s[s.length - 1]
                    }`
                )
            );
            // TODO: add Artist, Album, etc. as mp3 tags to the final file
        }
    });
