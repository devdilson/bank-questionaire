import type { Meta, StoryObj } from '@storybook/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';
import { Account } from '../model/model';



const meta: Meta<typeof Header> = {
  title: 'Example/Header',
  component: Header,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter><Story /></BrowserRouter>
    ),
  ], // Added the decorator
  parameters: {
    layout: 'centered', // Example parameter for consistent centering
  },
  args: {
    companyName: 'SecureBank',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotLoggedIn: Story = {

};

export const LoggedIn: Story = {
  args: {
    currentUser: { 
      username: 'John Doe', entitlement: ['BranchEmployee'] 
    } as Account,
  }
};

