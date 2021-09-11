import { Message, VoiceChannel } from 'discord.js';
import { IParsedCommand } from '../../command/command-parser';
import { BaseCommandPlugin } from '../base-command-plugin';
import axios from 'axios';
import * as googleTTS from 'google-tts-api';

enum TTSVoiceEngine {
    AMAZON,
    GOOGLE,
}

interface TTSVoice {
    id: string;
    engine: TTSVoiceEngine;
    description?: string;
}

interface TTSVoiceQueue {
    url: string;
    channel: VoiceChannel;
}

class TTSPlugin extends BaseCommandPlugin {
    private voices: { [key: string]: TTSVoice };
    private queue: TTSVoiceQueue[];
    private isPlaying: boolean;

    constructor() {
        super({
            name: 'TTS',
        });

        this.queue = [];
        this.isPlaying = false;

        this.voices = {
            pt: {
                id: 'Ricardo',
                description: 'Português masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            pt2: {
                id: 'Vitoria',
                description: 'Português feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            pt3: {
                id: 'pt',
                description: 'Português feminino 2',
                engine: TTSVoiceEngine.GOOGLE,
            },

            pt4: {
                id: 'Ines',
                description: 'Português feminino 3',
                engine: TTSVoiceEngine.AMAZON,
            },

            pt5: {
                id: 'Cristiano',
                description: 'Português masculino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            dk: {
                id: 'Naja',
                description: 'Dinamarquês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            dk2: {
                id: 'Mads',
                description: 'Dinamarquês masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            cn: {
                id: 'Zhiyu',
                description: 'Chinês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            fr: {
                id: 'Lea',
                description: 'Francês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            fr2: {
                id: 'Mathieu',
                description: 'Francês masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            jp: {
                id: 'Mizuki',
                description: 'Japonês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            kr: {
                id: 'Seoyeon',
                description: 'Coreano feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            jp2: {
                id: 'Takumi',
                description: 'Japonês masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            en: {
                id: 'Joanna',
                description: 'Inglês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            en2: {
                id: 'Matthew',
                description: 'Inglês masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            es: {
                id: 'Penelope',
                description: 'Espanhol feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            es2: {
                id: 'Miguel',
                description: 'Espanhol masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            es3: {
                id: 'es',
                description: 'Espanhol feminino 2',
                engine: TTSVoiceEngine.GOOGLE,
            },

            de: {
                id: 'de',
                description: 'Alemão feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            gr: {
                id: 'el',
                description: 'Grego feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            hu: {
                id: 'hu',
                description: 'Húngaro feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            la: {
                id: 'la',
                description: 'Latim masculino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            hi: {
                id: 'hi',
                description: 'Hindi feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            ru: {
                id: 'ru',
                description: 'Russo feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            ar: {
                id: 'ar',
                description: 'Árabe feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            th: {
                id: 'th',
                description: 'Tailandês feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            it: {
                id: 'it',
                description: 'Italiano masculino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            eo: {
                id: 'eo',
                description: 'Esperanto masculino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            fi: {
                id: 'fi',
                description: 'Finlandês feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            su: {
                id: 'su',
                description: 'Sundanês feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            sv: {
                id: 'sv',
                description: 'Sueco feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            pl: {
                id: 'pl',
                description: 'Polonês masculino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            no: {
                id: 'no',
                description: 'Norueguês feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            tr: {
                id: 'tr',
                description: 'Turco feminino',
                engine: TTSVoiceEngine.GOOGLE,
            },

            nl: {
                id: 'Lotte',
                description: 'Holandês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            nl2: {
                id: 'Ruben',
                description: 'Holandês masculino',
                engine: TTSVoiceEngine.AMAZON,
            },

            en3: {
                id: 'Nicole',
                description: 'Inglês feminino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            en4: {
                id: 'Olivia',
                description: 'Inglês feminino 3',
                engine: TTSVoiceEngine.AMAZON,
            },

            en5: {
                id: 'Russell',
                description: 'Inglês masculino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            en6: {
                id: 'Emma',
                description: 'Inglês feminino 4',
                engine: TTSVoiceEngine.AMAZON,
            },

            en7: {
                id: 'Brian',
                description: 'Inglês masculino 3',
                engine: TTSVoiceEngine.AMAZON,
            },

            in: {
                id: 'Aditi',
                description: 'Inglês indiano feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            in2: {
                id: 'Raveena',
                description: 'Inglês indiano feminino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            pl2: {
                id: 'Ewa',
                description: 'polonês masculino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            pl3: {
                id: 'Maja',
                description: 'polonês masculino 3',
                engine: TTSVoiceEngine.AMAZON,
            },

            pl4: {
                id: 'Jacek',
                description: 'polonês feminino',
                engine: TTSVoiceEngine.AMAZON,
            },

            pl5: {
                id: 'Jan',
                description: 'polonês feminino 2',
                engine: TTSVoiceEngine.AMAZON,
            },

            cy: {
                id: 'Gwyneth',
                description: 'Welsh',
                engine: TTSVoiceEngine.AMAZON,      
            },

            tr2: {
                id: 'Filiz',
                description: 'Turco feminino 2',
                engine: TTSVoiceEngine.AMAZON,      
            }
        };

        this.attachEvents();

        Object.keys(this.voices).forEach(key => {
            this.addCommand({
                key,
                params: [
                    {
                        name: 'text',
                        type: 'string',
                    },
                ],
                handler: this.handleTTS.bind(this),
            });
        });

        this.tickQueue();
    }

    private addToQueue(queue: TTSVoiceQueue) {
        this.queue.push(queue);
    }

    private tickQueue() {
        if (this.queue.length > 0) {
            if (!this.isPlaying) {
                const current = this.queue[0];

                this.playAudio(current)
                    .then(() => {
                        this.queue.shift();
                    })
                    .catch(err => {
                        console.log(err);
                    })
                    .finally(() => {
                        this.isPlaying = false;
                    });
            }
        }

        setTimeout(this.tickQueue.bind(this), 1e2);
    }

    private playAudio(queue: TTSVoiceQueue) {
        return new Promise((resolve, reject) => {
            this.isPlaying = true;

            queue.channel
                .join()
                .then(connection => {
                    const broadcast = connection.play(queue.url);

                    broadcast.on('finish', resolve);
                })
                .catch(reject);
        });
    }

    private getAudio(voice: TTSVoice, text: string): Promise<string> {
        return new Promise(resolve => {
            switch (voice.engine) {
                case TTSVoiceEngine.AMAZON:
                    axios
                        .post('https://streamlabs.com/polly/speak/', {
                            voice: voice.id,
                            text,
                        })
                        .then(res => {
                            resolve(res.data['speak_url']);
                        });
                    break;
                case TTSVoiceEngine.GOOGLE:
                    const url = googleTTS.getAudioUrl(text, {
                        lang: voice.id,
                        slow: false,
                    });
                    resolve(url);
                    break;
            }
        });
    }

    private handleTTS(command: IParsedCommand, message: Message) {
        const voice = this.voices[command.key];
        const [text] = command.params;

        this.getAudio(voice, text).then(url => {
            console.log(voice, text);
            this.addToQueue({
                url,
                channel: message.member.voice.channel,
            });
        });
    }
}

export { TTSPlugin };
