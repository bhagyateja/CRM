import { useContacts, useAddContact } from '../api/contacts';

export default function Contacts() {
  const { data, isLoading } = useContacts();
  const addContact = useAddContact();

  const handleAdd = () => {
    addContact.mutate({
      name: 'Test User',
      email: 'test@example.com',
      phone: '1234567890',
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Contacts</h1>
      <button className="btn" onClick={handleAdd}>Add Contact</button>
      <ul>
        {data?.map((contact: any) => (
          <li key={contact.id}>{contact.name} - {contact.email}</li>
        ))}
      </ul>
    </div>
  );
}
