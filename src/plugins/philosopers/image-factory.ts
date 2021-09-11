import Jimp, { measureTextHeight } from 'jimp';
import path from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';

interface IGenerateOptions {
    text: string;
    philosopher?: 'martin' | 'rousseau';
}

class PhilosophersImageFactory {
    bigFont: any;
    smallFont: any;
    assetsPath = path.join(__dirname, '..', '..', '..', 'assets');

    constructor() {
        this.init();
    }

    private async init() {
        this.bigFont = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
        this.smallFont = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    }

    public async create(data: IGenerateOptions) {
        const WIDTH = 520;
        const HEIGHT = 384;

        const { text, philosopher = 'martin' } = data;

        return new Promise<string>((resolve, reject) => {
            try {
                Jimp.read(path.join(this.assetsPath, `${philosopher}.png`)).then(image => {
                    image.print(
                        this.bigFont,
                        0,
                        0,
                        {
                            text,
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        WIDTH,
                        HEIGHT
                    );

                    const textHeight = measureTextHeight(this.bigFont, text, WIDTH);

                    image.print(
                        this.smallFont,
                        0,
                        textHeight,
                        {
                            text: '"Martin Luther King Jr."',
                            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
                            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
                        },
                        WIDTH,
                        HEIGHT
                    );

                    const imageName = `${uuid()}.png`;

                    image.write(imageName, () => resolve(imageName));
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    public async delete(fileName: string) {
        fs.unlinkSync(fileName);
    }
}

export { PhilosophersImageFactory };
