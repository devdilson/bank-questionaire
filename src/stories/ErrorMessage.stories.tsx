import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from '../components/ErrorMessage'
import { within, expect } from '@storybook/test';


const meta = {
    title: 'Components/ErrorMessage',
    component: ErrorMessage,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A message component of notifications and alerts.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: 'select',
            options: ['error', 'success', 'warning', 'info'],
            description: 'The type of message to display',
            defaultValue: 'info'
        },
        message: {
            control: 'text',
            description: 'The main message text'
        },
        children: {
            control: 'text',
            description: 'Optional additional content'
        }
    }
} satisfies Meta<typeof ErrorMessage>;

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
    args: {
        message: 'This is a default info message',
        type: 'info'
    }
};

export const Error: Story = {
    args: {
        message: 'An error occurred while processing your request',
        type: 'error'
    }
};

export const Success: Story = {
    args: {
        message: 'Your changes have been saved successfully',
        type: 'success'
    }
};

export const Warning: Story = {
    args: {
        message: 'Please review your information before proceeding',
        type: 'warning'
    }
};

export const WithAdditionalContent: Story = {
    args: {
        message: 'Please note the following details:',
        type: 'info',
        children: (
            <ul className="list-disc ml-4 mt-2">
                <li>First important detail</li>
                <li>Second important detail</li>
                <li>Third important detail</li>
            </ul>
        )
    }
};


export const LongMessage: Story = {
    args: {
        message: 'This is a very long message that demonstrates how the component handles extended content. It might wrap to multiple lines and should still maintain proper spacing and alignment within the component.',
        type: 'warning'
    }
};

export const ComplexContent: Story = {
    args: {
        message: 'Operation completed with warnings',
        type: 'warning',
        children: (
            <>
                <p className="mt-2 font-semibold">Details:</p>
                <div className="mt-2 space-y-2">
                    <div className="flex items-center gap-2">
                        <span>●</span>
                        <span>Some files were not processed</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>●</span>
                        <span>Network connection was unstable</span>
                    </div>
                </div>
            </>
        )
    }
};

export const TestRendering: Story = {
    args: {
        message: 'Test message',
        type: 'info'
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        const messageElement = canvas.getByText('Test message');
        await expect(messageElement).toBeInTheDocument();

        const container = messageElement.closest('div');
        expect(container).toHaveClass('p-4', 'rounded-md', 'border');
    }
};


export const TestWithChildren: Story = {
    args: {
        message: 'Parent message',
        type: 'info',
        children: <div data-testid="child-content">Child content</div>
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);

        await expect(canvas.getByText('Parent message')).toBeInTheDocument();
        await expect(canvas.getByTestId('child-content')).toBeInTheDocument();
    }
};

