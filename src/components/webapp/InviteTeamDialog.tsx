
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';

interface InviteTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InviteTeamDialog: React.FC<InviteTeamDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [emails, setEmails] = useState(['']);
  const [message, setMessage] = useState('Join me on Synapses to streamline our GRC workflows with AI-powered agents.');

  const addEmailField = () => {
    setEmails([...emails, '']);
  };

  const removeEmailField = (index: number) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const handleSendInvites = () => {
    // Mock invite logic
    console.log('Sending invites to:', emails.filter(email => email.trim()));
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Team Members</DialogTitle>
          <DialogDescription>
            Invite your colleagues to join Synapses and collaborate on compliance tasks.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label>Email Addresses</Label>
            {emails.map((email, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                />
                {emails.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeEmailField(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addEmailField}
              className="mt-2 flex items-center gap-2"
            >
              <Plus size={16} />
              Add another
            </Button>
          </div>

          <div>
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message to your invitation"
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendInvites}>
              Send Invites
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
