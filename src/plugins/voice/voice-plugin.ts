import { Message, VoiceConnection } from 'discord.js';
import { IParsedCommand } from '../../command/command-parser';
import { BaseCommandPlugin } from '../base-command-plugin';
import fs from 'fs';
import { Readable } from 'stream';

enum VoiceStatus {
    RECORDING = 0,
    PLAYBACK = 1,
    WAITING = 2,
}

class VoicePlugin extends BaseCommandPlugin {
    private status: VoiceStatus;
    private currentConnection: VoiceConnection;
    private audios: Readable[];

    constructor() {
        super({
            name: 'Voice',
        });

        this.status = VoiceStatus.WAITING;
        this.currentConnection = null;
        this.audios = [];

        this.addCommand({
            key: '!ju',
            params: [
                {
                    name: 'cmd',
                    type: 'string',
                },
            ],
            handler: this.handleCommand.bind(this),
        });

        this.attachEvents();
    }

    public handleCommand(command: IParsedCommand, message: Message) {
        const [currentCommand] = command.params;

        if (currentCommand === 'r') {
            this.startRecording(command, message);
        }

        if (currentCommand === 's') {
            this.stopRecording();
        }
    }

    public startRecording(command: IParsedCommand, message: Message) {
        if (this.status !== VoiceStatus.WAITING) return;

        const channel = message.member.voice.channel;

        channel.join().then(connection => {
            this.status = VoiceStatus.RECORDING;

            this.currentConnection = connection;

            // channel.members.forEach(member => {
            //     const audio = connection.receiver.createStream(member, {
            //         mode: 'pcm',
            //         end: 'manual',
            //     });

            //     audio.pipe(fs.createWriteStream(member.nickname + '.pcm'));

            //     this.audios.push(audio);
            // });

            connection.on('speaking', (user, speaking) => {
                const audioStream = connection.receiver.createStream(user, { mode: 'pcm' });
                audioStream.pipe(fs.createWriteStream(`${user.username}.pcm`));

                if (speaking) {
                    console.log(`${user.username} started speaking`);
                } else {
                    
                }

                audioStream.on('end', () => {
                    console.log(`${user.username} stopped speaking`);
                })
            });
        });
    }

    public stopRecording() {
        this.audios.forEach(audio => {
            audio.destroy();
        });
    }
}

export { VoicePlugin };
