const path = require('path'),
  fs = require('fs/promises'),
  fsSync = require('fs');

////////////////////////////////
const VersionsPath = path.resolve(process.env.LOCALAPPDATA ?? process.env.TARGET, 'Roblox', 'Versions');
const OofOgg = 'https://gh.expo.moe/oof/ouch.ogg';
const RelativePathToFile = 'content/sounds/ouch.ogg';
////////////////////////////////

(async () => {
  const versions = await fs.readdir(VersionsPath)
  for (const version of versions) {
    const vPath = path.join(VersionsPath, version)
    const oggPath = path.join(vPath, RelativePathToFile);
    if (fsSync.existsSync(oggPath)) {
      console.log('Patching for ' + version + '\nDownloading...');
      const rs = Buffer.from(await fetch(OofOgg).then(response => response.arrayBuffer()));
      console.log('Writing....');
      await fs.writeFile(oggPath, rs)
      console.log('Done!');
    } else
      console.warn(`Version ${version} does not have ${oggPath}`)
  }
})()
