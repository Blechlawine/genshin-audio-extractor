# Genshin Audio Extractor

## Usage

1. Extract your audio files from the Genshin Impact datafiles.

```
GenshinImpact_Data/StreamingAssets/AudioAssets/*.pck
```

Move the .pck files you want to extract into the `input` folder. The files *must* be directly inside the folder - no subdirectories.
After every game udpate you can just copy all the pck files into the input folder again, the program will identify the new wav files in the end

2. install dependencies

run this in the repository root folder:
```bash
yarn
```

3. Run the program to decode the pck files

```bash
yarn decode
```
The files in `./input` will be converted to .wav files inside `./output`.

4. To update the hashes in the database with their current filename, run this:

```bash
yarn updateDatabase
```
this will calculate a hash for each of the decoded .wav files and save that with the filename in the database

5. to extract the files of a specific game update, run this:

```bash
yarn extract
```
this will ask you which update you would like to extract. If the update/collection you would like isn't listed, you can create one yourself by adding a `.yml` file in the _metadata folder. For what you need to write in that file, you can check the other `.yml` files in _metadata, they have some music tracks specified. If you're writing the file with VSCode, you also get intellisense, if you add this line at the top of the `.yml` file:
```yml
# yaml-language-server: $schema=../schema/metadata.json
```

After creating this file and specifying the correct hashes, which correspond with the files you want, you can now continue with step 5.

## Options

You can pass an optional argument to export the audio in different formats.

Valid arguments are `flac`, `mp3` and `flacandmp3`

```bash
yarn decode --audio flac
```

Encoding details

```
flac: lossless, 16bit, 44100 sample rate
mp3: 320kbit/s, 44100 sample rate
```

### Todo:

- [ ] Clean up dependencies

- [ ] Cross-Platform (Win, Linux, OSX)

- [x] Multi-export support (FLAC, MP3, etc)

- [x] Automatically remove processed files once complete

- [x] Multithreading

- [ ] More?
