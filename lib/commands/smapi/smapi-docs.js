const baseCommand = 'ask smapi';
const spacesWithShellCharacter = 2;

class SmapiDocs {
    constructor(commander) {
        this.commander = commander;
        this.commands = commander.commands;
    }

    _makeOptionsString(options, commandName) {
        return options.map(option => {
            const { mandatory, flags } = option;
            const prefix = mandatory ? '<' : '[';
            const suffix = mandatory ? '>' : ']';

            const spacesCount = baseCommand.length + commandName.length + spacesWithShellCharacter;
            return `${' '.repeat(spacesCount)}${prefix}${flags.split(',').join('|')}${suffix}`;
        }).join('\n').trim();
    }

    _cleanDescription(description = '') {
        let cleanedDescription = description.trim();
        if (cleanedDescription.length > 1 && !cleanedDescription.endsWith('.')) {
            cleanedDescription = `${cleanedDescription}.`;
        }

        // replace required and optional strings

        cleanedDescription = cleanedDescription.replace('[REQUIRED]', 'Required.');
        cleanedDescription = cleanedDescription.replace('[OPTIONAL]', 'Optional.');
        cleanedDescription = cleanedDescription.replace(/\n/g, '');
        // adding new line before * to correctly render list in markdown
        // cleanedDescription = cleanedDescription.replace('*', '\n*');

        if (cleanedDescription == "Provides the ASK CLI profile to use. When you don't include this option, ASK CLI uses the default profile.") {
            cleanedDescription = "Optional. Provides the ASK CLI profile to use. When you don't include this option, ASK CLI uses the default profile."
        }
        else if (cleanedDescription == "Enables the ASK CLI  to show debug messages in the output of the command.") {
            cleanedDescription = "Optional. Enables the ASK CLI to show debug messages in the output of the command."
        }

        cleanedDescription = cleanedDescription.replace(/,/g, ', ');
        cleanedDescription = cleanedDescription.replace(/,  /g, ', ');

        return cleanedDescription;
    }

    generateViewData() {
        const commands = this.commands.map(command => {
            const parsedCommand = {
                name: command._name,
                description: this._cleanDescription(command._description),
                optionsString: this._makeOptionsString(command.options, command._name),
                options: command.options.map(option => ({ name: option.flags, description: this._cleanDescription(option.description) }))
            };
            return parsedCommand;
        });

        return {
            baseCommand,
            commands
        };
    }
}

module.exports = { SmapiDocs };
