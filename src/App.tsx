
function App() {

  const dummyContacts1 = [
  ];

  return (
    <ContactList contacts={dummyContacts1}/>
  )
}

export default App

function ContactList({ contacts }) {
	return (
		<div>
			<ul>
				{contacts.length
					? contacts.map((contact) => (
							<li key={contact.id}>
								{contact.firstName} {contact.lastName}
							</li>
						))
					: null}
			</ul>
		</div>
	)
}