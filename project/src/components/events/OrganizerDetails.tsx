import React from 'react';
import { User } from 'lucide-react';

interface OrganizerDetailsProps {
  firstName: string;
  lastName: string;
  email: string;
}

const OrganizerDetails: React.FC<OrganizerDetailsProps> = ({
  firstName,
  lastName,
  email
}) => {
  return (
    <div className="flex items-start gap-3 p-4 bg-[#432818] rounded-lg">
      <div className="p-2 bg-[#6F1D1B] rounded-full">
        <User size={24} className="text-[#FFE6A7]" />
      </div>
      <div>
        <h3 className="text-[#FFE6A7] font-medium">
          {firstName} {lastName}
        </h3>
        <p className="text-sm text-[#BB9457]">Event Organizer</p>
        <a
          href={`mailto:${email}`}
          className="text-sm text-[#BB9457] hover:text-[#FFE6A7] transition-colors"
        >
          {email}
        </a>
      </div>
    </div>
  );
};

export default OrganizerDetails; 