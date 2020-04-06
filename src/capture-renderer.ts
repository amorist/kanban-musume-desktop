import { remote, shell } from 'electron';
import fs from 'fs';

const takePhoto = (async (): Promise<void> => {
    const img = await remote.getCurrentWindow().capturePage();
    const screenShotPath = `${remote.app.getPath('desktop')}/screenshot.png`;
    fs.writeFileSync(screenShotPath, img.toPNG());
    shell.openExternal(`file://${screenShotPath}`);
})
export = takePhoto;