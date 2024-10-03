import {
    MessageErrorHtml,
    MessageInstructionHtml
} from './Message';

export default {
    title: 'Molecules/Messages',
    parameters: {
        status: {
            type: 'beta',
        },
    }
};

export const MessageError = {
    render: () => MessageErrorHtml(),
};
MessageError.storyName = 'm-message-error';

export const MessageInstruction = {
    render: () => MessageInstructionHtml(),
};
MessageInstruction.storyName = 'm-message-instruction';
